
import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, Percent } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";

const AffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [loanTerm, setLoanTerm] = useState(25);
  const [maxAffordability, setMaxAffordability] = useState(0);

  useEffect(() => {
    calculateAffordability();
  }, [annualIncome, monthlyDebts, downPayment, interestRate, loanTerm]);

  const calculateAffordability = () => {
    // Simplified affordability calculation
    // 1. Calculate gross debt service ratio (GDS) - housing costs should be <32% of income
    // 2. Calculate total debt service ratio (TDS) - total debt payments should be <40% of income
    
    // Monthly income
    const monthlyIncome = annualIncome / 12;
    
    // Maximum monthly payment based on GDS (32% rule)
    const maxMonthlyPaymentGDS = monthlyIncome * 0.32;
    
    // Maximum monthly payment based on TDS (40% rule), considering existing debts
    const maxMonthlyPaymentTDS = (monthlyIncome * 0.40) - monthlyDebts;
    
    // Use the lower of the two limits
    const maxMonthlyPayment = Math.min(maxMonthlyPaymentGDS, maxMonthlyPaymentTDS);
    
    // Calculate max mortgage amount based on payment, interest rate and term
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Present value of an annuity formula to calculate mortgage amount
    let maxMortgage = 0;
    if (monthlyRate > 0) {
      maxMortgage = maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate;
    } else {
      maxMortgage = maxMonthlyPayment * numberOfPayments;
    }
    
    // Add down payment to get total affordability
    const totalAffordability = maxMortgage + downPayment;
    
    setMaxAffordability(Math.round(totalAffordability));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <>
      <Navbar />
      <PageHeader
        title="Affordability Calculator"
        description="Find out how much house you can afford based on your income and expenses"
        backgroundImage="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=1933&auto=format&fit=crop"
      />

      <section className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Calculate Your Home Buying Power</h2>
            <p className="mb-8 text-muted-foreground">
              Use our affordability calculator to estimate how much home you can afford based on your 
              income, expenses, and other financial factors.
            </p>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="annualIncome">Annual Gross Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <Input 
                    id="annualIncome"
                    type="text"
                    value={formatCurrency(annualIncome).replace('$', '')}
                    onChange={(e) => setAnnualIncome(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="monthlyDebts">Monthly Debt Payments</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <Input 
                    id="monthlyDebts"
                    type="text"
                    value={formatCurrency(monthlyDebts).replace('$', '')}
                    onChange={(e) => setMonthlyDebts(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Include car loans, student loans, credit card minimums, etc.
                </p>
              </div>

              <div className="space-y-4">
                <Label htmlFor="downPayment">Available Down Payment</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <Input 
                    id="downPayment"
                    type="text"
                    value={formatCurrency(downPayment).replace('$', '')}
                    onChange={(e) => setDownPayment(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="interestRate">Interest Rate ({interestRate}%)</Label>
                </div>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <Slider
                    id="interestRateSlider"
                    min={1}
                    max={10}
                    step={0.1}
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="loanTerm">Loan Term ({loanTerm} years)</Label>
                </div>
                <Slider
                  id="loanTermSlider"
                  min={5}
                  max={30}
                  step={5}
                  value={[loanTerm]}
                  onValueChange={(value) => setLoanTerm(value[0])}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Card className="shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground">
                <div className="flex items-center gap-3">
                  <Calculator size={24} />
                  <CardTitle>Your Home Buying Power</CardTitle>
                </div>
                <CardDescription className="text-primary-foreground/90">Based on your financial information</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">
                    {formatCurrency(maxAffordability)}
                  </div>
                  <p className="text-muted-foreground mb-6">Maximum home price you can likely afford</p>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-left">
                      <p className="text-sm font-medium">Annual Income</p>
                      <p className="text-lg">{formatCurrency(annualIncome)}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Down Payment</p>
                      <p className="text-lg">{formatCurrency(downPayment)}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Monthly Debts</p>
                      <p className="text-lg">{formatCurrency(monthlyDebts)}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Interest Rate</p>
                      <p className="text-lg">{interestRate}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
                <p>
                  This is an estimate only. Actual affordability may vary based on credit score, debt-to-income ratio, and other factors. Consult with a mortgage professional for a personalized assessment.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default AffordabilityCalculator;
