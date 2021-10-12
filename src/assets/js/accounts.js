// validation rules
var add_account_validation = $("#add_accounts_form").validate({
  // debug: true,
  rules: {
    name: "required",
    email: "required",
    privilege: "required",
    phoneNumber: {
      required: true,
      rangelength: [10, 10],
      number: true,
    },
    alternateNumber: {
      rangelength: [10, 10],
      number: true,
    },
    password: {
      required: true,
      minlength: 8,
    },
    address: "required",
    pincode: {
      required: true,
      rangelength: [6, 6],
      number: true,
    },
  },
  messages: {
    phoneNumber: {
      rangelength: "Phone number should be of 10 digits",
    },
    alternateNumber: {
      rangelength: "Phone number should be of 10 digits",
    },
    pincode: {
      rangelength: "Pincode should be of 6 digits",
    },
  },
});

$("#add_accounts_form").submit((e) => {
  e.preventDefault();

  var validation_result = add_account_validation.form();

  if (validation_result != true) return;
  console.log("Default preventes");

  // setting spinner
  $("#add_account_submit").prop("disabled", true);
  $("#add_account_submit").html(`<div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`);

  var form = $(this);
  // var name = form.find;

  var sj = $("#add_accounts_form input");

  const submitObj = {};

  for (let index = 0; index < sj.length; index++) {
    var name = sj[index]["name"];
    var val = $(`input[name=${name}]`).val();
    submitObj[name] = val;
    console.log(name + " = " + val);
  }

  submitObj.privilege = $("#Privilege").val();

  //   taking address
  submitObj.address = $("#Address").val();

  console.log(submitObj);

  $.ajax({
    contentType: "application/json",
    type: "POST",
    url: "/api/addAdmin",
    data: JSON.stringify(submitObj),
    success: (data, status) => {
      $("#add_account_response").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong> <i class="fas fa-check-circle"></i> Success!</strong> Account of <strong> ${data.name} </strong> created successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`);

      $("#add_account_submit").html("Add Account");
      $("#add_account_submit").prop("disabled", false);

      // alert("success");
      scrollToTop();
      $("#fetch_accounts_list").removeClass("d-none");
      $("#fetch_accounts_list_deleted").removeClass("d-none");
      var inputs = document.getElementsByClassName("form-control");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    },
    error: (req, textStatus, errorObj) => {
      $("#add_account_response").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong> <i class="fas fa-exclamation-triangle"></i> Some error occured!</strong> ${textStatus} (${req.status}).
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`);
    },
    dataType: "json",
  });
});

function addNodeInList(list_id, data) {
  // list id = list where node to be added
  // data = data to be added
  // type = active / inactive node type
  const toAddList = $("#" + list_id);

  var image = data.image;
  var privilege = data.privilege;
  var active = data.active;
  var activeText = "";
  var buttonOption = `<a href="accounts/${data.adminId}" class="btn btn-sm bg-primary text-white m-1"><i class="fas fa-info-circle"></i></a>`;

  if (image == null) image = "/assets/img/user.png";

  if (active == true)
    buttonOption += `<button class="btn btn-sm bg-danger text-white m-1" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="setDeleteModal('${data.adminId}', '${data.name}', '${data.email}')"><i class="fas fa-trash"></i></button>`;
  else buttonOption += '<button class="btn btn-sm bg-info text-white m-1"><i class="fas fa-undo-alt"></i></button>';

  if (privilege == "admin") privilege = '<span class="badge bg-primary rounded-pill">Admin</span>';
  else privilege = '<span class="badge bg-info rounded-pill">Moderator</span>';

  if (active == false) activeText = '<span class="badge bg-danger rounded-pill">Deleted</span>';

  const listNode = document.createElement("li");
  listNode.className = "list-group-item d-flex flex-wrap justify-content-between align-items-start p-md-3";
  listNode.setAttribute("id", data.adminId);

  listNode.innerHTML = `
  <img src="${image}" class="px-md-3" height="120px" alt="${data.name}" />
  <div class="ms-2 me-auto">
    <div class="fw-bold">${data.name}</div>
    <small class="text-muted">
    <span>
    ${data.email} <br />
    ${data.phoneNumber} <br />
    </span>
    </small>
    <p>${buttonOption}</p>
    </div>
    <div>
      
      ${privilege}
      ${activeText} 
    </div>
  `;

  toAddList.append(listNode);
}

function setDeleteModal(id, name, email) {
  console.log("sdkjfhskd");
  $("#exampleModalLabel").html(`<span class='text-danger'> <i class='fas fa-trash'></i> Delete Comfirmation</span>`);
  $("#exampleModalBody").html(`
    <p>Are you sure you want to delete this account: </p>
    <p><small>Name : </small> ${name}</p>
    <p><small>Email : </small> ${email}</p>
  `);
  $("#exampleModalFooter").html(`
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-danger" id='delete_account_confirmation_btn' onclick="deleteAccount('${id}', '${name}')"> Delete Account</button>
  `);
}

function populate_list(list_id, data, suffix) {
  console.log("popu");
  console.log(data);
  // empty the list1
  const list = $("#" + list_id);
  list.empty();
  // preparing to insert

  // hide refresh button
  $("#fetch_accounts_list" + suffix).addClass("d-none");
  // empty message div content
  $("#accounts_message_div" + suffix).html("");
  if (data.length == 0) $("#accounts_message_div" + suffix).html("<div class='text-center'>No Accounts Found</div>");
  for (let index = 0; index < data.length; index++) {
    addNodeInList(list_id, data[index]);
  }
}

function get_admin_list(type) {
  var suffix = "";
  if (type == "inactive") suffix = "_deleted";

  const msg = document.getElementById(`accounts_message_div${suffix}`);
  msg.innerHTML = `
    <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`;

  var url = "";
  if (type == "active") url = "allActiveAdmins";
  else url = "allDeactiveAdmins";

  $.ajax({
    type: "GET",
    url: `/api/${url}`,
    contentType: "application/json",

    success: (data, status) => {
      console.log(status);
      console.log(data);

      // populate list remain
      if (type == "active") {
        populate_list("all_accounts_list", data, suffix);
      } else {
        populate_list("all_deleted_accounts_list", data, suffix);
      }
    },
    dataType: "json",
  });
}

function deleteAccount(id, name) {
  $("#delete_account_confirmation_btn").addClass("disabled");
  $("#delete_account_confirmation_btn").html(`Deleting...`);

  var account_delete_req = $.ajax({
    url: `/api/deleteAdmin/${id}`,
    type: "DELETE",
  });
  account_delete_req.done((data) => {
    console.log(data);

    $(`#${id}`).remove();
    // get_admin_list("active");
    get_admin_list("inactive");

    $("#accounts_message_div").html(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong><i class='fas fa-trash'></i> Account Deleted!</strong> Account of <strong>${name}</strong> deleted.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `);
  });

  account_delete_req.fail((req, textStatus) => {
    $("#accounts_message_div").html(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong><i class='fas fa-exclainmation-circle'></i> Error!</strong> ${textStatus} - ${req.status}.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `);
  });

  account_delete_req.always(() => {
    $("#delete_account_confirmation_btn").removeClass("disabled");
    $("#exampleModal").modal("hide");
    scrollToTop();
  });
}
