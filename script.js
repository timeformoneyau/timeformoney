// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('salary-form');
    const result = document.getElementById('net-salary');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const grossSalary = parseFloat(document.getElementById('gross-salary').value);
        if (isNaN(grossSalary) || grossSalary <= 0) {
            result.textContent = 'Please enter a valid salary.';
            return;
        }

        const netSalary = calculateNetSalary(grossSalary);
        result.textContent = `Your net annual salary is $${netSalary.toFixed(2)}.`;
    });

    function calculateNetSalary(gross) {
        // Australian tax rates for FY2024/2025
        let tax = 0;
        let taxableIncome = gross;

        if (taxableIncome <= 18200) {
            tax = 0;
        } else if (taxableIncome <= 45000) {
            tax = (taxableIncome - 18200) * 0.19;
        } else if (taxableIncome <= 120000) {
            tax = (taxableIncome - 45000) * 0.325 + 5092;
        } else if (taxableIncome <= 180000) {
            tax = (taxableIncome - 120000) * 0.37 + 29467;
        } else {
            tax = (taxableIncome - 180000) * 0.45 + 51667;
        }

        // Medicare levy (2% of taxable income)
        const medicareLevy = gross * 0.02;

        // Net salary calculation
        return gross - tax - medicareLevy;
    }
});
