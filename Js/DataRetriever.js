$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:3000/EmployeeData/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var tableBody = $(".TableBody");
            tableBody.empty();

            $.each(data, function (index, value) {
                var tableRow = $("<tr class='UserDataRow'>");
                tableRow.append("<td class='ProfilePicColomn'><img src='" + value.ProfilePic + "' alt='Profile Pic'></td>");
                tableRow.append("<td class='UserDataText NameColomn'>" + value.Name + "</td>");
                tableRow.append("<td class='UserDataText GenderColomn'>" + value.Gender + "</td>");

                // Splitting department string into array
                var departments = value.Department.split(" ");

                var departmentColomn = $("<td class='DepartmentColomn'>");
                var departmentDiv = $("<div class='UserDataDept'>");

                $.each(departments, function (index, value) {
                    var departmentSpan = $("<span class='DeptStyle'>");
                    departmentSpan.text(value);
                    departmentDiv.append(departmentSpan);
                });

                departmentColomn.append(departmentDiv);
                tableRow.append(departmentColomn);

                tableRow.append("<td class='UserDataText SalaryColomn'>" + value.Salary + "</td>");
                tableRow.append("<td class='UserDataText StartDateColomn'>" + value.StartDate + "</td>");
                tableRow.append("<td class='ActionsColomn'><div class='UserDataActions'><img src='../assets/delete-black-18dp.svg' alt='Delete' id = 'DeleteButton' onClick='DeleteRecord(" + value.id + ")'><img class='EditImage' src='../assets/create-black-18dp.svg' alt='Edit' id = 'EditButton' onClick='UpdateRecord(" + value.id + ")'></div></td>");

                tableBody.append(tableRow);
            });
        }});
});

function DeleteRecord(id) {
    $.ajax({
        url: "http://localhost:3000/EmployeeData/" + id,
        type: "DELETE",
        success: function () {
            tableRow.remove();
        },
        error: function () {
            alert("Error deleting record.");
        }
    });
}

function UpdateRecord(recId) {

    localStorage.setItem('employeeData', recId);
    window.open("../Pages/EmployeeEdit.html");

}

function EditCancel(){

    window.open("../Pages/EmployeeDashboard.html");
}

$('#SubmitButton').click(function(){

    let empId = localStorage.getItem('employeeData');
    let userName = $('#NameText').val();
    // console.log(userName);

    let radioButton = document.querySelector('input[name="ProfilePic"]:checked');
    let selectedProfilePic = radioButton.value;
    // console.log(selectedProfilePic);

    let genderRadioButton = document.querySelector('input[name="Gender"]:checked');
    let selectedGender = genderRadioButton.value;
    // console.log(selectedGender);
    
    let checkBoxes = document.getElementsByName('Department');
    let selectedCheckboxValues = [];
    for(let i=0; i<checkBoxes.length;i++)
    {
        if(checkBoxes[i].checked == true)
        {
            selectedCheckboxValues.push(checkBoxes[i].value)
        }
    }
    // console.log(selectedCheckboxValues);

    let selectedDepartment = selectedCheckboxValues.join(' ');

    let salary = document.getElementById('salary').value;
    // console.log(salary);

    let selectedDay = document.getElementById('day').value;
    let selectedMonth = document.getElementById('month').value;
    let selectedYear = document.getElementById('year').value;

    let notesContent = document.getElementById('notes').value;
    // console.log(notesContent);

    let editData={
        Name:userName,
        ProfilePic:selectedProfilePic,
        Gender:selectedGender,
        Department:selectedDepartment,
        Salary:salary,
        StartDate:selectedDay+' '+selectedMonth+' '+selectedYear,
        Notes:notesContent
    };

    
    $.ajax({
        url: 'http://localhost:3000/EmployeeData/'+empId,
        type: 'PUT',
        dataType: 'json',
        data: editData,
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error);
        }
    });
});