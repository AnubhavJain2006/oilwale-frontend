function submitAddCompany() {
  var vehicleCompany = $("#addVehicleCompany").val();

  if (vehicleCompany.length == 0) {
    $("#addCompanyValid").html("<small class='text-danger'>Provide a company name</small>");
    $("#addVehicleCompany").focus();
    return;
  }

  const submitObj = {
    vehicleCompany: vehicleCompany,
  };

  $("#addCompanySubmitBtn").addClass("disabled");
  $("#addCompanySubmitBtn").html(`<div class="spinner-border spinner-border-sm mx-4 text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    `);

  var addCompanyReq = $.ajax({
    url: "/api/addVehicleCompany",
    type: "POST",
    data: JSON.stringify(submitObj),
    contentType: "application/json",
    dataType: "json",
  });

  addCompanyReq.done((data) => {
    console.log(data);
    $("#addCompanyResponse").html(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong> <i class="fas fa-check-circle"></i> Success! </strong>Company <strong> ${data.vehicleCompany} </strong> added successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
  });

  addCompanyReq.fail((req) => {
    $("#addCompanyResponse").html(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong> <i class="fas fa-exclaimation-circle"></i> Error! </strong> Some error occured while adding company.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `);
  });

  addCompanyReq.always(() => {
    $("#addCompanySubmitBtn").removeClass("disabled");
    $("#addCompanySubmitBtn").html(`Add new Company`);
  });
}

function populateCompanyList() {
  // companyList
  var companyListReq = $.ajax({
    url: "/api/getVehicleCompany",
    type: "GET",
  });

  companyListReq.done((data) => {
    // clear the existing list
    $("#companyList").empty();

    for (var i = 0; i < data.length; i++) {
      $("#companyList").append(`<option value="${data[i].vehicleCompanyId}"> ${data[i].vehicleCompany} </option>`);
    }
  });

  companyListReq.fail((error) => {
    $(`<small class="text-red"> Error in fetching company list</small>`).inserAfter("#companyList");
  });
}

function addSuggestionField() {
  $("#suggestionArea").append(`
        <div class="d-flex align-items-center">
            <select class="form-select form-select mt-1" name="suggestedProduct" aria-label=".form-select-lg example">
                <option value="0">Choose...</option>
                <option value="1">Product1</option>
                <option value="2">Product1</option>
                <option value="3">Product1</option>
            </select>
            <i class="fas fa-times-circle mx-1" onclick="removeSuggestionField(this)"></i>
        </div>
    `);
}

function removeSuggestionField(element) {
  element.parentNode.remove();
}
