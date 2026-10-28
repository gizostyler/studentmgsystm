
const form = document.getElementById("studentForm");
const error = document.getElementById("error");
const results = document.getElementById("results");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // 1. Get student information
    const name = document.getElementById("studentName").value.trim();
    const mathText = document.getElementById("math").value;
    const englishText = document.getElementById("english").value;
    const scienceText = document.getElementById("science").value;
    const attendanceText = document.getElementById("attendance").value;
    const activity = document.getElementById("activity").value;

    error.textContent = "";
    results.hidden = true;

    // 2. Validate the inputs
    if (
        name === "" ||
        mathText === "" ||
        englishText === "" ||
        scienceText === "" ||
        attendanceText === ""
    ) {
        error.textContent = "Please fill in all required fields.";
        return;
    }

    const math = Number(mathText);
    const english = Number(englishText);
    const science = Number(scienceText);
    const attendance = Number(attendanceText);

    if (
        ![math, english, science, attendance].every(
            value => Number.isFinite(value) &&
                     value >= 0 && value <= 100
        )
    ) {
        error.textContent =
            "Marks and attendance must be between 0 and 100.";
        return;
    }

    // 3. Calculate total and percentage
    const total = math + english + science;
    const percentage = (total / 300) * 100;

    // 4. Calculate grade using if...else if...else
    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    // 5. Determine PASS or FAIL
    let status;

    if (
        math >= 40 &&
        english >= 40 &&
        science >= 40 &&
        percentage >= 50
    ) {
        status = "PASS";
    } else {
        status = "FAIL";
    }

    // 6. Determine scholarship using nested if...else
    let scholarship;

    if (status === "PASS") {
        if (percentage >= 90 && attendance >= 90) {
            scholarship = "Full Scholarship (100%)";
        } else if (percentage >= 80 && attendance >= 85) {
            scholarship = "50% Scholarship";
        } else if (percentage >= 70 && attendance >= 75) {
            scholarship = "25% Scholarship";
        } else {
            scholarship = "Not Eligible";
        }
    } else {
        scholarship = "Not Eligible (Failed)";
    }

    // 7. Get a remark using switch
    let remark;

    switch (grade) {
        case "A+":
            remark = "Excellent performance!";
            break;
        case "A":
            remark = "Very good work!";
            break;
        case "B":
            remark = "Good performance.";
            break;
        case "C":
            remark = "Fair performance. Keep improving.";
            break;
        case "D":
            remark = "You passed the grade range, but improve.";
            break;
        case "F":
            remark = "Needs improvement.";
            break;
        default:
            remark = "No remark available.";
    }

    // 8. Show the activity message using if...else
    let activityMessage;

    if (activity === "None") {
        activityMessage = "No extra-curricular activity recorded.";
    } else {
        activityMessage = "Activity recorded: " + activity;
    }

    // 9. Display the results
    document.getElementById("studentResult").textContent =
        "Student: " + name;

    document.getElementById("totalResult").textContent =
        "Total: " + total + " / 300";

    document.getElementById("percentageResult").textContent =
        "Percentage: " + percentage.toFixed(2) + "%";

    document.getElementById("gradeResult").textContent =
        "Grade: " + grade;

    document.getElementById("statusResult").textContent =
        "Status: " + status;

    document.getElementById("scholarshipResult").textContent =
        "Scholarship: " + scholarship;

    document.getElementById("remarkResult").textContent =
        "Remark: " + remark;

    document.getElementById("activityResult").textContent =
        activityMessage;

    results.hidden = false;
});

// Clear old results and error messages
form.addEventListener("reset", function () {
    error.textContent = "";
    results.hidden = true;
});
