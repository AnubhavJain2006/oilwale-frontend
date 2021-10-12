function create_row(data) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>name</td>
    <td>phr</td>
    <td>are</td>
    <td>pi</td>
    <td>i</td>
  `;
  return tr;
}

function get_all_customers() {
  //   var all_customer_req = $.ajax({
  //     type: "GET",
  //     url: "/api/getCustomers",
  //     contentType: "application/json",
  //     dataType: "json",
  //   });
  //   all_customer_req.done((data, status) => {
  //     console.log(data);
  //     console.log(status);
  //     const table = $("#all_customers_table");
  //     for (var index = 0; index < data.length; index++) {
  //       var row = create_row(data[index]);
  //       table.append(row);
  //     }
  //   });
}

$("#all_customer_table").DataTable({
  ajax: {
    url: "/api/getCustomers",
    dataSrc: "",
  },
  columns: [
    { data: "customerName" },
    { data: "customerPhoneNumber" },
    { data: "customerAddress" },
    { data: "customerPincode" },
    {
      data: "customerId",
      render: (data) => {
        return '<a href="/schemes/' + data + '" class="btn btn-outline-primary"><i class="fas fa-info-circle"></i></a>';
      },
    },
  ],
});
