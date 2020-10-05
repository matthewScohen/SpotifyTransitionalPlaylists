
  var songTable = $('#songTable').DataTable({
  "scrollX": true,
  "scrollY": "70vh",
  "searching": false,
  "info": false,
  "paging": false,
  });

  $('.dataTables_length').addClass('bs-select');

$(document).ready(function () {
  $('#dt-vertical-scroll').dataTable({
    "searching": false,
    "info": false,
    "paging": false,
    "scrollY": "11vh",
  });
});
