
import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
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

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [loanTerm, setLoanTerm] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);

  useEffect(() => {
    calculateMortgage();
    setDownPaymentPercentage((downPayment / homePrice) * 100);
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
      return;
    }

    const monthlyPaymentAmount =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(Math.round(monthlyPaymentAmount * 100) / 100);
  };

  const handleDownPaymentSliderChange = (value: number[]) => {
    const percentage = value[0];
    setDownPaymentPercentage(percentage);
    const newDownPayment = Math.round((percentage / 100) * homePrice);
    setDownPayment(newDownPayment);
  };

  const handleHomePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setHomePrice(value);
    // Maintain the same percentage for down payment
    setDownPayment(Math.round((downPaymentPercentage / 100) * value));
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setDownPayment(value);
    setDownPaymentPercentage((value / homePrice) * 100);
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
        title="Mortgage Calculator"
        description="Plan your home purchase with our easy-to-use mortgage calculator"
        backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1932&auto=format&fit=crop"
      />

      <section className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Estimate Your Monthly Mortgage Payment</h2>
            <p className="mb-8 text-muted-foreground">
              Use our mortgage calculator to estimate your monthly mortgage payment,
              including principal, interest, taxes, insurance, and HOA fees.
            </p>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="homePrice">Home Price</Label>
                <Input
                  id="homePrice"
                  type="text"
                  value={formatCurrency(homePrice).replace('$', '')}
                  onChange={handleHomePriceChange}
                  className="text-lg"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="downPayment">Down Payment ({downPaymentPercentage.toFixed(1)}%)</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(downPayment)}
                  </span>
                </div>
                <Slider
                  id="downPaymentSlider"
                  min={5}
                  max={50}
                  step={1}
                  value={[downPaymentPercentage]}
                  onValueChange={handleDownPaymentSliderChange}
                />
                <Input
                  id="downPayment"
                  type="text"
                  value={formatCurrency(downPayment).replace('$', '')}
                  onChange={handleDownPaymentChange}
                  className="text-lg"
                />
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
                  <Calculator size={24} />
                  <CardTitle>Monthly Payment Estimate</CardTitle>
                </div>
                <CardDescription className="text-primary-foreground/90">Based on your inputs</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">
                    {formatCurrency(monthlyPayment)}
                  </div>
                  <p className="text-muted-foreground mb-6">per month</p>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-left">
                      <p className="text-sm font-medium">Loan Amount</p>
                      <p className="text-lg">{formatCurrency(homePrice - downPayment)}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Down Payment</p>
                      <p className="text-lg">{formatCurrency(downPayment)}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Interest Rate</p>
                      <p className="text-lg">{interestRate}%</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Loan Term</p>
                      <p className="text-lg">{loanTerm} years</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
                <p>
                  This is an estimate only. Actual payments may vary based on exact interest rate, taxes, insurance, and other factors.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default MortgageCalculator;
