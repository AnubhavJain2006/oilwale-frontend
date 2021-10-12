// fetch table data
var products_data = $("#all_products_table").DataTable({
  ajax: {
    url: "/api/getAllProduct",
    dataSrc: "",
  },
  columns: [
    { data: "productName" },
    { data: "specification" },
    { data: "grade" },
    { data: "packingSize" },
    { data: "active" },
    {
      data: "productId",
      render: (data, type, row, meta) => {
        return '<a href="/products/' + data + '" class="btn btn-outline-primary"> <i class="fas fa-info-circle"></i> </a>';
      },
    },
  ],
});

// validation rules
var add_product_validation = $("#add_products_form").validate({
  rules: {
    productName: "required",
    specification: "required",
    grade: "required",
    packingSize: "required",
  },
});

// add product data
$("#add_products_form").submit((e) => {
  e.preventDefault();

  console.log("defaults prevented");

  var validation_result = add_product_validation.form();

  if (validation_result != true) return;

  const fd = $("#add_products_form input");

  // setting spinner
  $("#add_products_submit").prop("disabled", true);
  $("#add_products_submit").html(`<div class="spinner-border spinner-border-sm" role="status">
     <span class="visually-hidden">Loading...</span>
   </div>`);

  const submitObj = {};

  for (var index = 0; index < fd.length; index++) {
    var name = fd[index]["name"];
    var val = $(`input[name=${name}]`).val();
    submitObj[name] = val;
    // console.log(name + " = " + val);
  }

  // submitObj.specification =
  submitObj.specification = $("#Specification").val();
  console.log(submitObj);

  var add_product_req = $.ajax({
    contentType: "application/json",
    type: "POST",
    url: "/api/addProduct",
    data: JSON.stringify(submitObj),
    dataType: "json",
  });

  add_product_req.done((data) => {
    $("#add_product_response").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong> <i class="fas fa-check-circle"></i> Success!</strong> Product <a class="alert-link" target="_blank" href="/products/${data.productId}">${data.productName} </a> added successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`);
    // alert("success");

    $("#add_products_submit").html("Add Account");
    $("#add_products_submit").prop("disabled", false);

    scrollToTop();

    for (let i = 0; i < fd.length; i++) {
      fd[i].value = "";
    }
    $("#Specification").val("");

    // updating the products table
    products_data.ajax.reload(() => {
      $("#products_table_msg").removeClass("d-none");
      $("#products_table_msg_body").html(`<i class="fas fa-info-circle"></i> New product <a class="alert-link" target="_blank" href="/products/${data.productId}">${data.productName} </a> added.`);
    });
  });

  add_product_req.fail((req, textStatus) => {
    $("#add_product_response").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong> <i class="fas fa-exclamation-triangle"></i> Some error occured!</strong> ${textStatus} (${req.status}).
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`);
  });
});
