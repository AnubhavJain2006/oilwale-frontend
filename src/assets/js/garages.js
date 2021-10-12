var garage_table = $("#all_garages_table").DataTable({
  ajax: {
    url: "/api/getAllGarages",
    dataSrc: "",
  },
  columns: [
    { data: "garageName" },
    { data: "name" },
    { data: "phoneNumber" },
    { data: "address" },
    { data: "pincode" },
    { data: "referralCode" },
    {
      data: "garageId",
      render: (data, type, row, meta) => {
        return '<a href="/garages/' + data + '" class="btn btn-outline-primary"> <i class="fas fa-info-circle"></i> </a>';
      },
    },
  ],
});

// validation rules
var add_garage_validation = $("#garageAddForm").validate({
  rules: {
    name: "required",
    garageName: "required",
    phoneNumber: {
      required: true,
      number: true,
      rangelength: [10, 10],
    },
    alternateNumber: {
      number: true,
      rangelength: [10, 10],
    },
    gstNumber: {
      // required: true,
      rangelength: [15, 15],
    },
    address: "required",
    pincode: {
      required: true,
      number: true,
      rangelength: [6, 6],
    },
    area: "required",
  },
  messages: {
    phoneNumber: {
      rangelength: "Phone number should be of 10 digits",
    },
    alternateNumber: {
      rangelength: "Alternate number should be of 10 digits",
    },
    gstNumber: {
      rangelength: "GST number should be of 15 characters",
    },
    pincode: {
      rangelength: "Pincode should be of 6 digits",
    },
  },
});

$("#garageAddForm").submit((e) => {
  e.preventDefault();
  console.log("Defaults prevented");
  const validation_result = add_garage_validation.form();

  if (validation_result != true) return;

  const submitObj = {};

  const fd = $("#garageAddForm input");

  for (var i = 0; i < fd.length; i++) {
    var name = fd[i]["name"];
    var val = $(`input[name=${name}]`).val();

    submitObj[name] = val;

    console.log(name + " = " + val);
  }

  submitObj["address"] = $("#Address").val();
  submitObj["area"] = $("#areaOptions").val();

  // const d = Date.now();

  // submitObj["createdAt"] = d.toIS;
  // submitObj["updatedAt"] = Date.now();

  console.log(submitObj);
  $("#add_garage_submit_btn").html(`<div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`);
  $("#add_garage_submit_btn").addClass("disabled");

  var add_garage_req = $.ajax({
    url: "/api/addGarage",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(submitObj),
    dataType: "json",
  });

  add_garage_req.done((data) => {
    console.log(data);
    $("#add_garage_response")
      .html(
        `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong><i class="fas fa-check-circle"></i> Success!</strong> New garage with name <strong>${data.garageName}</strong> added successfully.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
      )
      .removeClass("d-none");

    setTimeout(function () {
      $("#add_garage_response").addClass("d-none");
    }, 6000);

    garage_table.ajax.reload();

    for (let i = 0; i < fd.length; i++) {
      fd[i].value = "";
    }
    $("#Address").val("");
  });

  add_garage_req.fail((req, status) => {
    $("#add_garage_response")
      .html(
        `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong> <i class="fas fa-exclamation-triangle"></i> Some error occured!</strong> ${textStatus} (${req.status}).
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
      )
      .removeClass("d-none");

    setTimeout(function () {
      $("#add_garage_response").addClass("d-none");
    }, 6000);
  });

  add_garage_req.always(() => {
    $("#add_garage_submit_btn").html("Add Account");
    $("#add_garage_submit_btn").removeClass("disabled");

    scrollToTop();
  });
});

// fetch placs of pincode
$("#Pincode").change(() => {
  var pin = $("#Pincode").val();

  if (pin.length != 6) return;
  if (isNaN(pin)) return;

  var pincode_req = $.ajax({
    url: `https://api.postalpincode.in/pincode/${pin}`,
    type: "GET",
  });

  pincode_req.done((data) => {
    console.log(data);
    console.log(data[0]["Status"]);
    if (data[0].Status != "Success") {
      $("#pincodeSearchResponse").addClass("error").html(`Invalid pincode`);
      return;
    } else $("#pincodeSearchResponse").html("");

    $("#areaOptions").empty();

    for (var index = 0; index < data[0].PostOffice.length; index++) {
      $("#areaOptions").append(`<option value='${data[0].PostOffice[index].Name}'>${data[0].PostOffice[index].Name}</option>`);
    }
  });
});
