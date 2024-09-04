document.addEventListener('DOMContentLoaded', function() {
    // Salary Calculator
    const salaryForm = document.getElementById('salary-form');
    const netSalary = document.getElementById('net-salary');
    const weeklyIncome = document.getElementById('weekly-income');
    const fortnightlyIncome = document.getElementById('fortnightly-income');
    const monthlyIncome = document.getElementById('monthly-income');
    const grossSalaryInput = document.getElementById('gross-salary');

    // Australian tax brackets for 2024
    const taxBrackets = [
        { threshold: 18200, rate: 0 },
        { threshold: 45000, rate: 0.19 },
        { threshold: 120000, rate: 0.325 },
        { threshold: 180000, rate: 0.37 },
        { threshold: Infinity, rate: 0.45 }
    ];

    salaryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const grossSalary = parseFloat(grossSalaryInput.value);

        if (isNaN(grossSalary) || grossSalary <= 0) {
            alert('Please enter a valid gross salary.');
            return;
        }

        let tax = 0;
        let previousThreshold = 0;

        for (let bracket of taxBrackets) {
            if (grossSalary > bracket.threshold) {
                tax += (bracket.threshold - previousThreshold) * bracket.rate;
                previousThreshold = bracket.threshold;
            } else {
                tax += (grossSalary - previousThreshold) * bracket.rate;
                break;
            }
        }

        const annualNetSalary = grossSalary - tax;
        const weeklyNetIncome = annualNetSalary / 52;
        const fortnightlyNetIncome = annualNetSalary / 26;
        const monthlyNetIncome = annualNetSalary / 12;

        netSalary.textContent = `Net Annual Salary: $${annualNetSalary.toFixed(2)}`;
        weeklyIncome.textContent = `Weekly Net Income: $${weeklyNetIncome.toFixed(2)}`;
        fortnightlyIncome.textContent = `Fortnightly Net Income: $${fortnightlyNetIncome.toFixed(2)}`;
        monthlyIncome.textContent = `Monthly Net Income: $${monthlyNetIncome.toFixed(2)}`;
    });

    // Pay Raise Calculator
    const payRaiseForm = document.getElementById('pay-raise-form');
    const payRaiseFeedback = document.getElementById('pay-raise-feedback');
    const inflationRate = 5.0; // Example inflation rate for September 2024

    payRaiseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const payRaise = parseFloat(document.getElementById('pay-raise').value);

        if (isNaN(payRaise) || payRaise < 0) {
            alert('Please enter a valid percentage.');
            return;
        }

        if (payRaise < inflationRate) {
            payRaiseFeedback.textContent = "Womp womp - you actually got a pay cut mate.";
        } else {
            payRaiseFeedback.textContent = "Good job - your employer isn't shite.";
        }
    });
});
