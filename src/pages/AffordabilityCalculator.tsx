
import React, { useState, useEffect } from "react";
import { DollarSign, Home, Calculator } from "lucide-react";
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
  const [downPayment, setDownPayment] = useState(50000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [interestRate, setInterestRate] = useState(5.0);
  const [loanTerm, setLoanTerm] = useState(25);
  const [affordablePrice, setAffordablePrice] = useState(0);

  useEffect(() => {
    calculateAffordability();
  }, [annualIncome, downPayment, monthlyDebts, interestRate, loanTerm]);

  const calculateAffordability = () => {
    // Gross Debt Service (GDS) ratio - housing costs shouldn't exceed 32% of gross annual income
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = monthlyIncome * 0.32 - monthlyDebts;
    
    // Calculate affordable mortgage amount based on payment
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    let affordableMortgage;
    if (monthlyRate === 0) {
      affordableMortgage = maxMonthlyPayment * numberOfPayments;
    } else {
      affordableMortgage = maxMonthlyPayment * 
        ((1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate);
    }
    
    // Total affordable price is mortgage amount plus down payment
    const maxPrice = affordableMortgage + downPayment;
    
    setAffordablePrice(Math.round(maxPrice));
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
        title="Home Affordability Calculator"
        description="Find out how much home you can afford based on your income and financial situation"
        imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
      />

      <section className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">How much home can you afford?</h2>
            <p className="mb-8 text-muted-foreground">
              Our affordability calculator helps you understand your buying power 
              based on your income, down payment, and existing debts.
            </p>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="annualIncome">Annual Household Income (before taxes)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Input
                    id="annualIncome"
                    type="text"
                    value={formatCurrency(annualIncome).replace('$', '')}
                    onChange={(e) => setAnnualIncome(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
                    className="pl-10 text-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="downPayment">Down Payment Available</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Input
                    id="downPayment"
                    type="text"
                    value={formatCurrency(downPayment).replace('$', '')}
                    onChange={(e) => setDownPayment(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
                    className="pl-10 text-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="monthlyDebts">Monthly Debt Payments (credit cards, loans, etc.)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Input
                    id="monthlyDebts"
                    type="text"
                    value={formatCurrency(monthlyDebts).replace('$', '')}
                    onChange={(e) => setMonthlyDebts(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
                    className="pl-10 text-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="interestRate">Interest Rate ({interestRate}%)</Label>
                </div>
                <Slider
                  id="interestRateSlider"
                  min={1}
                  max={10}
                  step={0.1}
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                />
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
                  <Home size={24} />
                  <CardTitle>Your Home Buying Power</CardTitle>
                </div>
                <CardDescription className="text-primary-foreground/90">Based on your financial situation</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">
                    {formatCurrency(affordablePrice)}
                  </div>
                  <p className="text-muted-foreground mb-6">maximum affordable home price</p>

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
                      <p className="text-sm font-medium">Debt-to-Income Ratio</p>
                      <p className="text-lg">32%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
                <p>
                  This calculation is an estimate based on standard lending practices. Actual affordability may vary based on credit score, lending policies, and other factors.
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
