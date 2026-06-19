let students = JSON.parse(localStorage.getItem("students")) || [];
let studentCounter =
    Number(localStorage.getItem("studentCounter")) || 1;

let editIndex = -1;

displayStudents();

function generateStudentId() {
    return String(studentCounter++).padStart(3, "0");
}

function saveData() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    localStorage.setItem(
        "studentCounter",
        studentCounter
    );
}

function addStudent() {

    const fname = document.getElementById("fname").value;
    const sname = document.getElementById("sname").value;
    const dob = document.getElementById("dob").value;
    const gender =
        document.querySelector('input[name="gender"]:checked')
            ?.value || "";
    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;
    const course = document.getElementById("course").value;
    if (
        !fname ||
        !sname ||
        !dob ||
        !gender ||
        !address ||
        !mobile ||
        !course
    ) {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {

        const student = {
            id: generateStudentId(),
            fname,
            sname,
            dob,
            gender,
            address,
            mobile,
            course,
        };

        students.push(student);

    } else {

        students[editIndex].fname = fname;
        students[editIndex].sname = sname;
        students[editIndex].dob = dob;
        students[editIndex].gender = gender;
        students[editIndex].address = address;
        students[editIndex].mobile = mobile;
        students[editIndex].course = course;

        editIndex = -1;

        document.getElementById("submitBtn").innerText = "Submit";
    }

    saveData();
    displayStudents();
    clearFields();
}

function displayStudents() {

    const table =
        document.getElementById("studentTableBody");

    table.innerHTML = "";

    students.forEach((student, index) => {

        table.innerHTML += `
        <tr>

            <td>${student.id}</td>
            <td>${student.fname}</td>
            <td>${student.sname}</td>
            <td>${student.dob}</td>
            <td>${student.gender}</td>
            <td>${student.address}</td>
            <td>${student.mobile}</td>
            <td>${student.course}</td>

            <td>

                <button
                    class="action-btn edit-icon"
                    onclick="editStudent(${index})">
                    ✏️
                </button>

                <button
                    class="action-btn delete-icon"
                    onclick="deleteStudent(${index})">
                    🗑️
                </button>

            </td>

        </tr>
        `;
    });
}

function editStudent(index) {

    const student = students[index];

    document.getElementById("fname").value =
        student.fname;

    document.getElementById("sname").value =
        student.sname;

    document.getElementById("dob").value =
        student.dob;

    document.getElementById("address").value =
        student.address;

    document.getElementById("mobile").value =
        student.mobile;

    document.getElementById("course").value =
        student.course;

    if (student.gender === "Male") {
        document.getElementById("male").checked = true;
    } else {
        document.getElementById("female").checked = true;
    }

    

    editIndex = index;

    document.getElementById("submitBtn").innerText = "Update";
}

function deleteStudent(index) {

    const student = students[index];

    const confirmDelete = confirm(
        `Do you want to delete student ${student.fname} ${student.sname}?`
    );

    if (confirmDelete) {

        students.splice(index, 1);

        saveData();
        displayStudents();
    }
}

function searchStudent() {

    const id = prompt("Enter Student ID");

    const student =
        students.find(s => s.id === id);

    if (student) {

        alert(
            `ID : ${student.id}

Name : ${student.fname} ${student.sname}

Mobile : ${student.mobile}`
        );

    } else {

        alert("Student Not Found");
    }
}

function clearFields() {

    document.getElementById("fname").value = "";
    document.getElementById("sname").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("address").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("course").value = "";

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    if (gender) {
        gender.checked = false;
    }

    editIndex = -1;

    document.getElementById("submitBtn").innerText = "Submit";
}