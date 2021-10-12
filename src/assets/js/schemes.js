function getFormatedDate(date) {
  const d = new Date(date);
  //   return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  return d.toDateString();
}

function setStatusString(startDate, endDate) {
  const now = Date.now();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now > end.getTime()) return '<span class="badge  bg-secondary">Concluded</span>';
  else if (now < start.getTime()) return '<span class="badge  bg-primary">Upcoming</span>';
  else return '<span class="badge  bg-success">Active</span>';
}

const schemes_data = $("#all_schemes_table").DataTable({
  ajax: {
    url: "/api/allActiveScheme",
    dataSrc: "",
  },
  columns: [
    { data: "schemeName" },
    {
      data: "description",
      render: (data, type, row, meta) => {
        return type === "display" && data.length > 40 ? data.substring(0, 35) + " ..." : data;
      },
    },
    {
      data: "startedAt",
      render: (data) => {
        return getFormatedDate(data);
      },
    },
    {
      data: "endedAt",
      render: (data) => {
        return getFormatedDate(data);
      },
    },
    {
      data: (row, type, set, meta) => {
        return setStatusString(row.startedAt, row.endedAt);
      },
      // render: (data) => {
      //   return "TODO";
      // },
    },
    {
      data: "schemeId",
      render: (data, type, row, meta) => {
        return '<a href="/schemes/' + data + '" class="btn btn-outline-primary"><i class="fas fa-info-circle"></i></a>';
      },
    },
  ],
});

// validation ruled
var add_scheme_validation = $("#add_scheme_form").validate({
  rules: {
    schemeName: "required",
    description: "required",
    startedAt: "required",
    endedAt: "required",
  },
});

$("#endedAt").change(() => {
  var startDate = $("#startedAt").val();
  var endDate = $("#endedAt").val();

  if (endDate == "") $("#endedAtmsg").html("");

  const sd = new Date(startDate);
  const ed = new Date(endDate);

  console.log("comparing");
  console.log(startDate);
  console.log(endDate);

  if (ed.getTime() < sd.getTime()) {
    $("#endedAtmsg").html("<small> <i class='fas fa-exclamation-circle'></i> End date is before Start date</small>");
    $("#scheme_submit_btn").addClass("disabled");
  } else {
    $("#endedAtmsg").html("");
    $("#scheme_submit_btn").removeClass("disabled");
  }
});

$("#startedAt").change(() => {
  var startDate = $("#startedAt").val();
  var endDate = $("#endedAt").val();

  if (endDate == "") $("#endedAtmsg").html("");

  const sd = new Date(startDate);
  const ed = new Date(endDate);

  console.log("comparing");
  console.log(startDate);
  console.log(endDate);

  if (ed.getTime() < sd.getTime()) {
    $("#endedAtmsg").html("<small> <i class='fas fa-exclamation-circle'></i> End date is before Start date</small>");
    $("#scheme_submit_btn").addClass("disabled");
  } else {
    $("#endedAtmsg").html("");
    $("#scheme_submit_btn").removeClass("disabled");
  }
});
// add scheme
var add_scheme = $("#add_scheme_form").submit((e) => {
  e.preventDefault();

  console.log("Defaults prevented");

  const fd = $("#add_scheme_form input");

  if (add_scheme_validation.form() != true) return;

  // TODO set spinner
  $("#scheme_submit_btn").prop("disabled", true);
  $("#scheme_submit_btn").html(`<div class="spinner-border spinner-border-sm" role="status">
     <span class="visually-hidden">Loading...</span>
   </div>`);

  const submitObj = {};

  for (var index = 0; index < fd.length; index++) {
    var name = fd[index]["name"];
    var val = $(`input[name=${name}]`).val();
    submitObj[name] = val;
    // console.log(name + " = " + val);
  }

  submitObj.description = $("#description").val();
  console.log(submitObj);

  var add_scheme_req = $.ajax({
    type: "POST",
    url: "/api/addScheme",
    data: JSON.stringify(submitObj),
    dataType: "json",
    contentType: "application/json",
  });

  add_scheme_req.done((data) => {
    $("#add_scheme_response").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong> <i class="fas fa-check-circle"></i> Success!</strong> Scheme <a class="alert-link" target="_blank" href="/schemes/${data.schemeId}">${data.schemeName} </a> added successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`);

    scrollToTop();

    for (let i = 0; i < fd.length; i++) {
      fd[i].value = "";
    }

    $("#description").val("");

    $("#scheme_submit_btn").html("Add Scheme");
    $("#scheme_submit_btn").prop("disabled", false);

    $("#Specification").val("");

    schemes_data.ajax.reload();
  });

  add_scheme_req.fail((req, textStatus) => {
    $("#add_scheme_response").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong> <i class="fas fa-exclamation-triangle"></i> Some error occured!</strong> ${textStatus} (${req.status}).
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`);
    $("#scheme_submit_btn").html("Add Scheme");
    $("#scheme_submit_btn").prop("disabled", false);
  });
});
