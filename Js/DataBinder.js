$('#SubmitButton').click(function(){
    let userName = document.getElementById('NameText').value;
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
    // console.log(selectedCheckboxValues.toString());

    let selectedDepartment = selectedCheckboxValues.join(' ');

    let salary = document.getElementById('salary').value;
    // console.log(salary);

    let selectedDay = document.getElementById('day').value;
    let selectedMonth = document.getElementById('month').value;
    let selectedYear = document.getElementById('year').value;

    let notesContent = document.getElementById('notes').value;
    // console.log(notesContent);

    let data={
        Name:userName,
        ProfilePic:selectedProfilePic,
        Gender:selectedGender,
        Department:selectedDepartment,
        Salary:salary,
        StartDate:selectedDay+' '+selectedMonth+' '+selectedYear,
        Notes:notesContent
    };

    $.ajax({
        url: 'http://localhost:3000/EmployeeData',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (result) {
            console.log(result);
        },
    });
});

