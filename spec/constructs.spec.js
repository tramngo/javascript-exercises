'use strict';

let expect = require('chai').expect;
let sinon = require('sinon');
let constructs = require('../lib/constructs');
let utils = require('../utils');

describe('Constructs', () => {

    describe('Switch Statement', () => {

        describe('When getting the type of a day', () => {
            it('It should report null as Not a day', () => {
                expect(constructs.getTypeOfDay(null)).to.equal("Not a day");
            });

            it('It should report Monday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Monday")).to.equal("Weekday");
            });

            it('It should report Tuesday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Tuesday")).to.equal("Weekday");
            });

            it('It should report Wednesday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Wednesday")).to.equal("Weekday");
            });

            it('It should report Thursday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Thursday")).to.equal("Weekday");
            });

            it('It should report Friday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Friday")).to.equal("Weekday");
            });

            it('It should report Saturday as a Weekend', () => {
                expect(constructs.getTypeOfDay("Saturday")).to.equal("Weekend");
            });

            it('It should report Sunday as a Weekend', () => {
                expect(constructs.getTypeOfDay("Sunday")).to.equal("Weekend");
            });

            it('It should report Something Else as Not a day', () => {
                expect(constructs.getTypeOfDay("Something Else")).to.equal("Not a day");
            });
        });

        describe('getTypeOfDay function', () => {
            
            beforeEach(() => {
                // Execute function for Wallaby to rerun these tests when the body of the function is changed.
                constructs.getTypeOfDay('');
            });
            
            it('It should contain a switch statement', () => {
                expect(constructs.getTypeOfDay.toString()).to.contain('switch');
            });

            it('It should not contain an if statement', () => {
                expect(constructs.getTypeOfDay.toString()).to.not.contain('if');
            });
        });
    });
    
    describe('Continue statement', () => {
        
        describe('When validating and creating a list of customers', () => {
            
            describe('When all of the customers are valid', () => {
                let customers, validateSpy, saveSpy;
                beforeEach(() => {
                    customers = [
                        {id: 1},
                        {id: 2},
                        {id: 3},
                        {id: 4},
                        {id: 5}
                    ];
                    validateSpy = sinon.spy(function () {
                        return true;
                    });
                    saveSpy = sinon.spy(function () { });
                    constructs.validateAndCreateCustomers(customers, validateSpy, saveSpy);
                });
                
                it('It should validate all of the customers', () => {
                    expect(validateSpy).to.have.been.calledWith(customers[0]);
                    expect(validateSpy).to.have.been.calledWith(customers[1]);
                    expect(validateSpy).to.have.been.calledWith(customers[2]);
                    expect(validateSpy).to.have.been.calledWith(customers[3]);
                    expect(validateSpy).to.have.been.calledWith(customers[4]);
                });
                
                it('It should save all of the customers', () => {
                    expect(saveSpy).to.have.been.calledWith(customers[0]);
                    expect(saveSpy).to.have.been.calledWith(customers[1]);
                    expect(saveSpy).to.have.been.calledWith(customers[2]);
                    expect(saveSpy).to.have.been.calledWith(customers[3]);
                    expect(saveSpy).to.have.been.calledWith(customers[4]);
                });
            });
            
            describe('When customers 2 and 4 are invalid, but the rest are valid', () => {
                let customers, validateSpy, saveSpy;
                beforeEach(() => {
                    customers = [
                        {id: 1},
                        {id: 2},
                        {id: 3},
                        {id: 4},
                        {id: 5}
                    ];
                    validateSpy = sinon.spy(function (customer) {
                        // Customers 2 and 4 are invalid, so return false for those.
                        if (customer === customers[1] || customer === customers[3]) {
                            return false;
                        }
                        return true;
                    });
                    saveSpy = sinon.spy(function () { });
                    constructs.validateAndCreateCustomers(customers, validateSpy, saveSpy);
                });
                
                it('It should validate all of the customers', () => {
                    expect(validateSpy).to.have.been.calledWith(customers[0]);
                    expect(validateSpy).to.have.been.calledWith(customers[1]);
                    expect(validateSpy).to.have.been.calledWith(customers[2]);
                    expect(validateSpy).to.have.been.calledWith(customers[3]);
                    expect(validateSpy).to.have.been.calledWith(customers[4]);
                });
                
                it('It should save customers 1, 3 and 5', () => {
                    expect(saveSpy).to.have.been.calledWith(customers[0]);
                    expect(saveSpy).to.have.been.calledWith(customers[2]);
                    expect(saveSpy).to.have.been.calledWith(customers[4]);
                });
                
                it('It should not save customers 2 and 4', () => {
                    expect(saveSpy).to.not.have.been.calledWith(customers[1]);
                    expect(saveSpy).to.not.have.been.calledWith(customers[3]);
                });
            });
        });
            
        describe('validateAndCreateCustomers function', () => {
            
            beforeEach(() => {
                // Execute function for Wallaby to rerun these tests when the body of the function is changed.
                constructs.validateAndCreateCustomers([]);
            });
            
            it('It should contain the continue keyword', () => {
                let functionBody = utils.removeInstrumentation(constructs.validateAndCreateCustomers.toString());
                expect(functionBody).to.contain('continue');
            });
            
            it('The continue keyword should appear before the saveCustomer call', () => {
                let functionBody = utils.removeInstrumentation(constructs.validateAndCreateCustomers.toString());
                expect(functionBody.includes('saveCustomer(customer)')).to.be.true;
                expect(functionBody.indexOf('continue')).to.be.lessThan(functionBody.indexOf('saveCustomer(customer)'));
            });
        });
    });

    describe('Breaking out of nested loops', () => {

        describe('When getting the binary values', () => {

            describe('When a limit has not been specified (i.e. null)', () => {
                let counters;
                let result;

                beforeEach(() => {
                    counters = { i: 0, j: 0, k: 0 };
                    result = constructs.getBinaryValuesUpTo(null, counters);
                });

                it('It should report null as 000, 001, 010, 011, 100, 101, 110, 111', () => {
                    expect(result).to.equal("000, 001, 010, 011, 100, 101, 110, 111");
                });

                it('It should have iterated over the whole triple nested loop', () => {
                    expect(counters).to.deep.equal({ i: 2, j: 2, k: 2 });
                });
            });

            describe('When a limit of 011 has been specified', () => {
                let counters;
                let result;

                beforeEach(() => {
                    counters = { i: 0, j: 0, k: 0 };
                    result = constructs.getBinaryValuesUpTo('011', counters);
                });

                it('It should report null as 000, 001, 010, 011, 100, 101, 110, 111', () => {
                    expect(result).to.equal("000, 001, 010, 011");
                });

                it('It should have broken out of the triple nested loop', () => {
                    expect(counters).to.deep.equal({ i: 0, j: 1, k: 1 });
                });
            });
        });

        describe('getBinaryValuesUpTo function - additional challenges', () => {
            
            beforeEach(() => {
                // Execute function for Wallaby to rerun these tests when the body of the function is changed.
                constructs.getBinaryValuesUpTo(null, {});
            });

            it('It should not contain any break statements', () => {
                expect(constructs.getBinaryValuesUpTo.toString()).to.not.contain('break');
            });

            it('It should not contain any continue statements', () => {
                expect(constructs.getBinaryValuesUpTo.toString()).to.not.contain('continue');
            });

            it('It should not contain more than 1 return statement that returns a value', () => {
                var functionBody = utils.removeInstrumentation(constructs.getBinaryValuesUpTo.toString());
                console.log(functionBody);
                var numberOfReturnStatements = (functionBody.match(/return.*/g) || []).length;
                var numberOfReturnStatementsWithoutValue = (functionBody.match(/return\s*;?$/gm) || []).length;
                console.log(numberOfReturnStatements);
                console.log(numberOfReturnStatementsWithoutValue);
                expect(numberOfReturnStatements - numberOfReturnStatementsWithoutValue).to.equal(1);
            });
        });
    });
});