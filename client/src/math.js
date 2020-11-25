export default function Math(principal) {
    var index = 0;
    this.setState({ dataSet2: this.state.dataSet[index].holdings });
    this.setState({ labels: this.state.dataSet[index].names });
    var expectedReturns = [];
    var bestCaseScenario = [];
    var worstCaseScenario = [];
    var labels = [];

    var portfolioValue = principal;
    var bestCaseValue = principal;
    var worstCaseValue = principal;

    console.log(portfolioValue);

    var minRisk = 0;
    var maxRisk = 0;
    var riskInterval = (maxRisk - minRisk) / 5;
    var tolerance0 = 0;
    var tolerance1 = 0;
    var tolerance2 = 0;
    var tolerance3 = 0;
    var tolerance4 = 0;
    var tolerance5 = 0;

    //loop through all portfolios to identify the min and max standard deviation
    for (var i = 0; i < this.state.dataSet.length; i++) {
        if (i === 0) {
            minRisk = this.state.dataSet[i].x;
            maxRisk = this.state.dataSet[i].x;
        } else {
            if (this.state.dataSet[i].x > maxRisk) {
                maxRisk = this.state.dataSet[i].x;
            }
            if (this.state.dataSet[i].x < minRisk) {
                minRisk = this.state.dataSet[i].x;
                tolerance0 = i;
            }
        }
    }

    //identify the appropriate portfolio for risk level
    for (i = 0; i < this.state.dataSet.length; i++) {
        // 1
        if (this.state.dataSet[i].x > minRisk && this.state.dataSet[i].x <= (minRisk + riskInterval)) {
            if (this.state.dataSet[i].y > this.state.dataSet[tolerance1].y) {
                tolerance1 = i;
            }
        }
        // 2
        if (this.state.dataSet[i].x > (minRisk + (riskInterval * 2)) && this.state.dataSet[i].x <= (minRisk + (riskInterval * 3))) {
            if (this.state.dataSet[i].y > this.state.dataSet[tolerance2].y) {
                tolerance2 = i;
            }
        }
        // 3
        if (this.state.dataSet[i].x > (minRisk + (riskInterval * 3)) && this.state.dataSet[i].x <= (minRisk + (riskInterval * 4))) {
            if (this.state.dataSet[i].y > this.state.dataSet[tolerance3].y) {
                tolerance3 = i;
            }
        }
        // 4
        if (this.state.dataSet[i].x > (minRisk + (riskInterval * 4)) && this.state.dataSet[i].x <= (minRisk + (riskInterval * 5))) {
            if (this.state.dataSet[i].y > this.state.dataSet[tolerance4].y) {
                tolerance4 = i;
            }
        }
        // 5
        if (this.state.dataSet[i].x > (minRisk + (riskInterval * 5)) && this.state.dataSet[i].x <= (minRisk + (riskInterval * 6))) {
            if (this.state.dataSet[i].y > this.state.dataSet[tolerance5].y) {
                tolerance5 = i;
            }
        }
    }

    for (i = 0; i < 40; i++) {

        var contribution = 0;

        for (var j = 0; j < this.state.income.length; j++) {
            if (i >= this.state.income[j].age1 && i <= this.state.income[j].age2) {
                contribution = this.state.income[j].income * (this.state.income[j].savings / 100);
                if (this.state.income[j].tolerance === 0) {
                    index = tolerance0;
                } else if (this.state.income[j].tolerance === 1) {
                    index = tolerance1;
                } else if (this.state.income[j].tolerance === 2) {
                    index = tolerance2;
                } else if (this.state.income[j].tolerance === 3) {
                    index = tolerance3;
                } else if (this.state.income[j].tolerance === 4) {
                    index = tolerance4;
                } else if (this.state.income[j].tolerance === 5) {
                    index = tolerance5;
                }
            }
        }

        if (i !== 0) {
            bestCaseValue = portfolioValue * (1 + (this.state.dataSet[index].x / 100));
            worstCaseValue = portfolioValue * (1 - (this.state.dataSet[index].x / 100));
            portfolioValue = (portfolioValue * (1 + (this.state.dataSet[index].y / 100))) + contribution;
        }
        expectedReturns[i] = portfolioValue;
        bestCaseScenario[i] = bestCaseValue;
        worstCaseScenario[i] = worstCaseValue;
        labels[i] = i;
    }

    this.setState({ dataSet3: expectedReturns });
    this.setState({ dataSet4: bestCaseScenario });
    this.setState({ dataSet5: worstCaseScenario });
    this.setState({ labels2: labels });
}