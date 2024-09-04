document.getElementById('salary-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the gross salary from the input field
    const grossSalary = parseFloat(document.getElementById('gross-salary').value);
    
    if (isNaN(grossSalary) || grossSalary <= 0) {
        alert('Please enter a valid gross salary.');
        return;
    }

    // Calculate net annual salary based on current Australian tax rates (2024/2025)
    let netSalary = grossSalary;
    
    // Example tax calculations (update with actual rates as necessary)
    if (grossSalary <= 18200) {
        netSalary = grossSalary; // No tax
    } else if (grossSalary <= 45000) {
        netSalary = grossSalary - (grossSalary - 18200) * 0.19;
    } else if (grossSalary <= 120000) {
        netSalary = grossSalary - 5092 - (grossSalary - 45000) * 0.325;
    } else if (grossSalary <= 180000) {
        netSalary = grossSalary - 29467 - (grossSalary - 120000) * 0.37;
    } else {
        netSalary = grossSalary - 51667 - (grossSalary - 180000) * 0.45;
    }

    // Calculate periodic incomes
    const weeklyIncome = netSalary / 52;
    const fortnightlyIncome = netSalary / 26;
    const monthlyIncome = netSalary / 12;

    // Display results
    document.getElementById('net-salary').textContent = `Net Annual Salary: $${netSalary.toFixed(2)}`;
    document.getElementById('weekly-income').textContent = `Weekly Income: $${weeklyIncome.toFixed(2)}`;
    document.getElementById('fortnightly-income').textContent = `Fortnightly Income: $${fortnightlyIncome.toFixed(2)}`;
    document.getElementById('monthly-income').textContent = `Monthly Income: $${monthlyIncome.toFixed(2)}`;
});
