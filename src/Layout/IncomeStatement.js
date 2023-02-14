import React, { Component } from "react";
import axios from "axios";
//AgGridReact
import { AgGridReact } from "ag-grid-react";
// Progress Bar
import ProgressBar from "react-bootstrap/ProgressBar";
// React Notification
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
//CSS import
import "react-notifications/lib/notifications.css";
import "./CSS/t.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function setaccName(accno) {
  var name = "";

  switch (accno) {
    case 400:
      name = "Rental Income";
      break;

    case 410:
      name = "Sales Income";
      break;

    case 420:
      name = "Interest Income";
      break;

    case 430:
      name = "Other Income";
      break;

    case 570:
      name = "Office Expense";
      break;

    case 585:
      name = "Computer Expenses";
      break;

    case 595:
      name = "Communication Expense";
      break;

    case 597:
      name = "Labour & Welfare Expenses";
      break;

    case 610:
      name = "Advertising Expenses";
      break;

    case 599:
      name = "Printing & Stationery Expenses";
      break;

    case 631:
      name = "Supplies Expense";
      break;

    case 711:
      name = "Depreciation Expense";
      break;

    case 722:
      name = "Insurance Expense";
      break;

    case 726:
      name = "Salaries and Wages Expense";
      break;

    case 729:
      name = "Rent Expense";
      break;

    case 732:
      name = "Utilities Expense";
      break;
    case 905:
      name = "Interest Expense";
      break;

    default:
      name = "";
      break;
  }
  return name;
}
/***
 * function which Produce Trailbalance Statement it takes each Account Object from the backend and call setaccName to setnames
 * and calculates the total
 *
 */
function getTrailBalance(accObj) {
  var accobj = {};
  var balance,
    creditval,
    debitval = 0; // eslint-disable-line no-unused-vars
  var creditname,
    debitname = "";
  var accObjArr = [];

  accObj.forEach((acco) => {
    debitname = acco.mname;
    creditname = acco.dname;
    debitval = acco.mvalue;
    creditval = acco.dvalue;
    //Account Object which take the names and the values and calculates the result
    accobj = {
      mname: debitname,
      mvalue: debitval,
      dname: creditname,
      cvalue: creditval,
      res:
        debitval > creditval
          ? (balance = debitval - creditval)
          : (balance = creditval - debitval),
    };

    accObjArr.push(accobj);
  });

  return accObjArr;
}

/***
 * function which Produce Income Statement it takes each Account Object from the backend and call setaccName
 * to setnames and calculates the total
 *
 */
function getIncomeSheet(accObj) {
  var incomesheet,
    resultIncomesheet = {};
  var creditValue,
    debitValue,
    result = 0;
  var name = "";
  var balanceArray = [];

  accObj.forEach((accb) => {
    name = setaccName(accb._id);

    debitValue = accb.mvalue;

    creditValue = accb.cvalue;

    result =
      debitValue > creditValue
        ? debitValue - creditValue + " Debit"
        : creditValue > debitValue
        ? creditValue - debitValue + " Credit"
        : 0;

    incomesheet = {
      name: name,
      mvalue: debitValue,
      cvalue: creditValue,
      res: result,
    };

    balanceArray.push(incomesheet);
  });
  // for loop to walk threw the balance array and calculate the sum or debits and the sum of credits

  for (var i = 0; i < balanceArray.length - 1; i++) {
    debitValue += balanceArray[i].mvalue;
    creditValue += balanceArray[i].cvalue;
  }

  resultIncomesheet = {
    name: "Result",
    mvalue: debitValue,
    cvalue: creditValue,
    res:
      debitValue > creditValue
        ? debitValue - creditValue + " Debit"
        : debitValue < creditValue
        ? creditValue - debitValue + " Credit"
        : "Equal Balance",
  };

  balanceArray.push(resultIncomesheet);

  return balanceArray;
}
/***
 * Class IncomeStatement
 *
 */
export class IncomeStatement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credit: "",
      debit: "",
      debitAccNo: null,
      CreditAccNo: null,
      debitValue: null,
      creditValue: null,
      kind: null,

      debitArr: [],
      creditArr: [],
      incomestat: null,
      trailstat: null,
      creditsum: null,
      debitsum: null,
      value: 0,

      columnDefs: [
        {
          headerName: "Account Name",
          field: "name",
          cellStyle: { color: "black", "background-color": "#5499c7" },
        },
        {
          headerName: "Debit Balance",
          field: "mvalue",
          cellStyle: function (params) {
            if (params.value === 0) {
              return { color: "red", "background-color": "#5499c7" };
            } else {
              return { color: "black", "background-color": "#5499c7" };
            }
          },
        },
        {
          headerName: "Credit Balance",
          field: "cvalue",
          cellStyle: function (params) {
            if (params.value === 0) {
              return { color: "red", "background-color": "#5499c7" };
            } else {
              return { color: "black", "background-color": "#5499c7" };
            }
          },
        },
        {
          headerName: "Result",
          field: "res",
          cellStyle: function (params) {
            if (params.value === "Equal Balance") {
              return { "background-color": "#FFC300", "font-weight": " bold" };
            } else if (
              typeof params.value === "string" &&
              params.value.indexOf("Debit") !== -1
            ) {
              return { "background-color": "#FF5733", "font-weight": " bold" };
            } else if (
              typeof params.value === "string" &&
              params.value.indexOf("Credit")
            ) {
              return { "background-color": "#36cc11", "font-weight": " bold" };
            }
          },
        },
      ],
      columnDefs2: [
        {
          headerName: "Account Debit Name",
          field: "mname",
          cellStyle: { color: "black", "background-color": "#5499c7" },
        },
        {
          headerName: "Account Credit Name",
          field: "dname",
          cellStyle: { color: "black", "background-color": "#5499c7" },
        },
        {
          headerName: "Debit Balance",
          field: "mvalue",
          cellStyle: function (params) {
            if (params.value === 0) {
              return { color: "red", "background-color": "#5499c7" };
            } else {
              return { color: "black", "background-color": "#5499c7" };
            }
          },
        },
        {
          headerName: "Credit Balance",
          field: "cvalue",
          cellStyle: function (params) {
            if (params.value === 0) {
              return { color: "red", "background-color": "#5499c7" };
            } else {
              return { color: "black", "background-color": "#5499c7" };
            }
          },
        },
        {
          headerName: "Result",
          field: "res",
          cellStyle: { "background-color": "#5499c7", "font-weight": " bold" },
        },
      ],
      rowClassRules: {
        "sick-days-warning": function (params) {
          var debitVal = params.data.mvalue;

          return debitVal < 1000;
        },
        "sick-days-breach": "data.mvalue >= 1000",
      },
    };

    this.AssetLiabilityAccounts = [
      { id: 101, name: "Bank/Cash at Bank" },
      { id: 112, name: "Accounts Receivable" },
      { id: 201, name: "Accounts Payable" },
    ];

    this.RevenueAccounts = [
      { id: 400, name: "Rental Income" },
      { id: 410, name: "Sales Income" },
      { id: 420, name: "Interest Income" },
      { id: 430, name: "Other Income" },
    ];

    this.ExpenseAccounts = [
      { id: 570, name: "Office Expense" },
      { id: 585, name: "Computer Expenses" },
      { id: 595, name: "Communication Expense" },
      { id: 597, name: "Labour & Welfare Expenses" },
      { id: 599, name: "Printing & Stationery Expenses" },
      { id: 610, name: "Advertising Expenses" },
      { id: 631, name: "Supplies Expense" },
      { id: 711, name: "Depreciation Expense" },
      { id: 722, name: "Insurance Expense" },
      { id: 726, name: "Salaries and Wages Expense" },
      { id: 729, name: "Rent Expense" },
      { id: 723, name: "Utilities Expense" },
      { id: 905, name: "Interest Expense" },
    ];
  }
  createNotification = (type) => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Success message", "Title here");
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;

        default:
          return null;
      }
    };
  };

  setaccNumber(name) {
    var n = 0;
    switch (name) {
      case "Bank/Cash at Bank":
        n = 101;
        break;
      case "Accounts Receivable":
        n = 112;
        break;
      case "Accounts Payable":
        n = 201;
        break;
      case "Rental Income":
        n = 400;
        break;
      case "Sales Income":
        n = 410;
        break;
      case "Interest Income":
        n = 420;
        break;
      case "Other Income":
        n = 430;
        break;
      case "Office Expense":
        n = 570;
        break;
      case "Computer Expenses":
        n = 585;
        break;
      case "Communication Expense":
        n = 595;
        break;
      case "Labour & Welfare Expenses":
        n = 597;
        break;
      case "Printing & Stationery Expenses":
        n = 599;
        break;
      case "Supplies Expense":
        n = 631;
        break;
      case "Depreciation Expense":
        n = 711;
        break;

      case "Insurance Expense":
        n = 722;
        break;
      case "Salaries and Wages Expense":
        n = 726;
        break;
      case "Rent Expense":
        n = 729;
        break;
      case "Utilities Expense":
        n = 732;
        break;
      case "Interest Expense":
        n = 905;
        break;
      default:
        n = 0;
        break;
    }
    return n;
  }

  //  Setting states by the values given in the form
  handleDebitAcc(e) {
    this.setState({ debit: e.target.value });
    this.setState({ debitAccNo: this.setaccNumber(e.target.value) });
  }
  handleCreditAcc(e) {
    this.setState({ credit: e.target.value });
    this.setState({ CreditAccNo: this.setaccNumber(e.target.value) });
  }

  handledAccVal(e) {
    this.setState({ debitValue: e.target.value });
  }

  handlecAccVal(e) {
    this.setState({ creditValue: e.target.value });
  }

  //This function to call the API getTrailBalance to get the Balance Statement data
  async ViewTrailBalance() {
    this.setState({ incomestat: null });
    this.setState({ trailstat: null });

    var gettrail = await axios
      .get("https://localhost:5001/getTrailBalance")

      .then((response) => {
        if (response.statusText === "OK") {
          const data = response.data;
          const res = getTrailBalance(data);
          this.setState({ kind: "success" });
          setTimeout(() => {
            this.setState({ value: 100 });
          }, 300);
          setTimeout(() => {
            this.setState({ trailstat: res });
          }, 1999);
          setTimeout(() => {
            NotificationManager.success(
              "Success message",
              "Data has been retrieved!",
              3000
            );
          }, 1900);
          setTimeout(() => {
            this.setState({ value: 0 });
          }, 2000);
          setTimeout(() => {
            this.setState({ kind: null });
          }, 2000);
        } else {
          this.setState({ kind: "warning" });
          setTimeout(() => {
            this.setState({ value: 100 });
          }, 300);
          setTimeout(() => {
            NotificationManager.warning(
              "Warning message",
              response.statusText,
              3000
            );
          }, 1900);
        }
      })
      .catch((err) => {
        this.setState({ kind: "danger" });
        setTimeout(() => {
          this.setState({ value: 100 });
        }, 0);

        if (err.response) {
          if (err.response.status <= 404) {
            NotificationManager.warning(
              "Warrning message",
              err.response.data,
              3000
            );
            this.setState({ trailstat: null });
            setTimeout(() => {
              this.setState({ value: 0 });
            }, 2000);
          } else if (err.response.status >= 500 && err.response.status < 505) {
            NotificationManager.Error(
              "Error 500 message",
              err.response.data,
              3000
            );
            this.setState({ trailstat: null });
            setTimeout(() => this.setState({ value: 0 }), 2000);
          }
        } else
          NotificationManager.error("Error message", "Network Error!", 3000);
        clearTimeout(this.myVar);
        this.myVar = setTimeout(() => {
          this.setState({ value: 0 });
        }, 2000);

        if (gettrail === "undefined") {
          NotificationManager.error(
            "Error message",
            "Database Connection problem!",
            3000
          );
          this.setState({ value: 100 });
          clearTimeout(this.myVar);
          this.myVar = setTimeout(() => {
            this.setState({ value: 0 });
          }, 2000);
        }
      });
  }

  //This function to call the API getBalance to get the Balance Statement data

  async activateBalance() {
    this.setState({ kind: "warning" }); //Balance statement color if warning
    this.setState({ incomestat: null });
    this.setState({ trailstat: null });
    var getSheet, getBalance;
    getBalance = await axios
      .get("http://localhost:4000/getBalance", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.length === 2) {
          NotificationManager.warning(
            "Warning message",
            "No transactions yet!",
            3000
          );
        }
        setTimeout(() => {
          this.setState({ value: 100 });
        }, 300);
        getSheet = getIncomeSheet(data);

        setTimeout(() => {
          this.setState({ value: 0 });
        }, 2000);
        setTimeout(() => {
          this.setState({ kind: null });
        }, 2000);
        setTimeout(() => {
          this.setState({ incomestat: getSheet });
        }, 1999);
        setTimeout(() => {
          NotificationManager.success(
            "Success message",
            "Data has been retrieved!",
            3000
          );
        }, 1900);
      })
      .catch((err) => {
        this.setState({ kind: "danger" });
        this.setState({ value: 100 });
        if (getBalance === "undefined") {
          NotificationManager.error(
            "Error message",
            "Database Connection problem!",
            3000
          );

          this.setState({ kind: "danger" });
          this.setState({ value: 100 });

          clearTimeout(this.myVar);

          this.myVar = setTimeout(() => {
            this.setState({ value: 0 });
          }, 2000);

          if (err.response.status >= 500 && err.response.status < 505) {
            this.setState({ kind: "danger" });
            this.setState({ value: 100 });
            NotificationManager.Error("Error message", err.response.data, 3000);

            this.myVar = setTimeout(() => {
              this.setState({ value: 0 });
            }, 2000);

            setTimeout(() => {
              this.setState({ value: 0 });
            }, 2000);
          }
        }
        if (err.response) {
          if (err.response.status <= 404) {
            NotificationManager.warning(
              "Warrning message",
              err.response.data,
              3000
            );

            this.setState({ trailstat: null });
            setTimeout(() => {
              this.setState({ value: 0 });
            }, 2000);
          }
        } else {
          console.log(err);
          NotificationManager.error("Error message", "Network Error!", 3000);
          clearTimeout(this.myVar);
          this.myVar = setTimeout(() => {
            this.setState({ value: 0 });
          }, 2000);
        }
      });
  }
  //resetting states and incomestatement
  resetstate(e) {
    this.setState({ kind: "secondary" });
    this.setState({ debitValue: null });
    this.setState({ creditValue: null });
    setTimeout(() => {
      this.setState({ incomestat: null });
    }, 1000);
    setTimeout(() => {
      this.setState({ trailstat: null });
    }, 1000);
    setTimeout(() => {
      this.setState({ CreditAccNo: null });
    }, 1000);
    setTimeout(() => {
      this.setState({ debitAccNo: null });
    }, 1000);
    this.Displayincomestatement.dd = null;
    setTimeout(() => {
      this.setState({ value: 100 });
    }, 300);
    setTimeout(() => {
      this.setState({ value: 0 });
    }, 2000);

    document.getElementById("dvalue").value = null;
    document.getElementById("cvalue").value = null;
    document.getElementById("select2").selectedIndex = 0;
    document.getElementById("select1").selectedIndex = 0;
  }
  //Emptying data from database
  async emptydata(e) {
    NotificationManager.error("", "Database has been reseted !", 3000);
    this.setState({ kind: "danger" });
    setTimeout(() => {
      this.setState({ value: 100 });
    }, 300);
    setTimeout(() => {
      this.setState({ value: 0 });
    }, 2000);
    await axios
      .post("https://localhost:5001/intializeData")
      .then(() => {
        console.log("Data has been cleared");
      })

      .catch((err) => {
        NotificationManager.warning(
          "Error message",
          "Error Reseting database!",
          3000
        );
      });
  }
  //Checking and inserting Data
  handleSubmit = async (e) => {
    setTimeout(() => {
      this.setState({ value: 100 });
    }, 300);
    setTimeout(() => {
      this.setState({ value: 0 });
    }, 2000);

    e.preventDefault();

    if (this.state.debitValue == null || isNaN(this.state.debitValue)) {
      NotificationManager.warning(
        "Enter a Valid Debit Value!",
        "Attention!",
        2000
      );
      this.setState({ kind: "danger" });

      return;
    } else if (
      this.state.creditValue == null ||
      isNaN(this.state.creditValue)
    ) {
      NotificationManager.warning(
        "Enter a Valid Credit Value!",
        "Attention!",
        2000
      );
      this.setState({ kind: "danger" });
      return;
    } else if (this.state.credit === "") {
      NotificationManager.warning(
        "Select a Credit Account!",
        "Attention!",
        2000
      );
      this.setState({ kind: "danger" });
      return;
    } else if (this.state.debit === "") {
      NotificationManager.warning(
        "Select a Debit Account!",
        "Attention!",
        2000
      );
      this.setState({ kind: "danger" });
      return;
    } else if (this.state.debit === this.state.credit) {
      NotificationManager.warning(
        "You cant make a a transaction with the same account!",
        "Attention!",
        2000
      );
      this.setState({ kind: "danger" });
      return;
    } else {
      setTimeout(() => {
        this.setState({ kind: "success" });
      }, 150);
    }
    //getting the data
    let data = {
      credit: this.state.credit,
      cAccNo: this.state.CreditAccNo,
      debit: this.state.debit,
      dAccNo: this.state.debitAccNo,
      cvalue: this.state.creditValue,
      dvalue: this.state.debitValue,
    };

    NotificationManager.info("Inserting!", "Status!", 2000);
    //Posting the data using Fetch
    return fetch("https://localhost:5001/saveIncomedata", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then(
        setTimeout(() => {
          NotificationManager.success(
            "Success message",
            "Data has been inserted!",
            2000
          );
        }, 2100),
        this.resetstate()
      )
      .then(
        setTimeout(() => {
          NotificationManager.success(
            "Success message",
            "Data has been inserted!",
            2000
          );
        }, 2100)
      )
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            NotificationManager.warning(
              "Warrning message",
              error.response.data,
              3000
            );
            setTimeout(() => {
              this.setState({ value: 0 });
            }, 2000);
          } else if (error.response.status === 503) {
            NotificationManager.warning(
              "Error message",
              "503 Service Unavailable Server Error !",
              3000
            );
            setTimeout(() => {
              this.setState({ value: 0 });
            }, 2000);
          }

          console.log("Error While inserting ! ", error.response.data);
        }

        console.error("There was an error!", error);
        NotificationManager.error("error", "Click me!", 5000, () => {
          alert(error);
        });

        return;
      });
  };

  //Balance Statement component
  Displayincomestatement = (props) => {
    if (this.state.incomestat) {
      return (
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "800px", display: "inline-block" }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            groupIncludeFooter={true}
            groupIncludeTotalFooter={true}
            rowData={this.state.incomestat}
            rowClassRules={this.state.incomestat}
          ></AgGridReact>
        </div>
      );
      //if Trail Balance statement is fetched show it
    } else if (this.state.trailstat) {
      return (
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "900px", display: "inline-block" }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs2}
            groupIncludeFooter={true}
            groupIncludeTotalFooter={true}
            rowData={this.state.trailstat}
          ></AgGridReact>
        </div>
      );
      //Else Don't show anything
    } else return null;
  };
  render() {
    return (
      <div style={{ backgroundColor: "white", color: "rgb(49, 115, 238)" }}>
        <br />
        <br />
        <section className="clean-block clean-hero">
          <div className="text">
            <p>
              <font color="#2e20a4">
                <b></b>
              </font>
            </p>
            <table className="table table-borderless table-light">
              <thead className="thead-light">
                <tr>
                  <th scope="col" colSpan="4">
                    <font size="4" color="#2e20a4">
                      Fill the Income Sheet
                    </font>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    {" "}
                    <label htmlFor="exampleFormControlInput1">
                      <font color="#2e20a4">
                        <b>Debit Account : </b>
                      </font>
                    </label>
                  </td>
                </tr>

                <tr>
                  <td>
                    {" "}
                    <label htmlFor="exampleFormControlInput1">
                      <font color="#2e20a4">
                        <select
                          className="form-control"
                          id="select1"
                          onChange={this.handleDebitAcc.bind(this)}
                        >
                          <option>Choose</option>
                          <optgroup label="Method">
                            {this.AssetLiabilityAccounts.map((acc) => (
                              <option key={acc.id}> {acc.name}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Revenue">
                            {this.RevenueAccounts.map((acc) => (
                              <option key={acc.id}> {acc.name}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Expenses">
                            {this.ExpenseAccounts.map((acc) => (
                              <option key={acc.id}> {acc.name}</option>
                            ))}
                          </optgroup>
                        </select>
                      </font>
                    </label>
                  </td>

                  <td>
                    {" "}
                    <input
                      type="number"
                      onChange={this.handledAccVal.bind(this)}
                      className="form-control"
                      id="dvalue"
                      placeholder="Account Value"
                    ></input>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="exampleFormControlInput1">
                      <font color="#2e20a4">
                        <b>Credit Account : </b>
                      </font>
                    </label>{" "}
                  </td>
                </tr>

                <tr>
                  <td>
                    <select
                      className="form-control"
                      id="select2"
                      onChange={this.handleCreditAcc.bind(this)}
                    >
                      <option>Choose</option>
                      <optgroup label="Method">
                        {this.AssetLiabilityAccounts.map((acc) => (
                          <option key={acc.id}> {acc.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Revenue">
                        {this.RevenueAccounts.map((acc) => (
                          <option key={acc.id}> {acc.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Expenses">
                        {this.ExpenseAccounts.map((acc) => (
                          <option key={acc.id}> {acc.name}</option>
                        ))}
                      </optgroup>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      onChange={this.handlecAccVal.bind(this)}
                      className="form-control"
                      id="cvalue"
                      placeholder="Account Value"
                    ></input>
                  </td>
                </tr>

                <tr>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary mb-2"
                      onClick={this.handleSubmit.bind(this)}
                    >
                      {" "}
                      Confirm
                    </button>
                  </td>
                  <td>
                    <button
                      type="reset"
                      onClick={this.resetstate.bind(this)}
                      className="btn btn-primary mb-2"
                    >
                      Reset
                    </button>{" "}
                  </td>
                </tr>
                <tr className="table-info">
                  <th scope="col" colSpan="4">
                    <font size="4" color="#2e20a4">
                      View Trail and Income Sheet
                    </font>
                  </th>
                </tr>

                <tr>
                  <td>
                    {" "}
                    <button
                      type="submit"
                      onClick={this.ViewTrailBalance.bind(this)}
                      className="btn btn-outline-info"
                    >
                      {" "}
                      View Trail Sheet{" "}
                    </button>
                  </td>

                  <td>
                    <button
                      type="submit"
                      onClick={this.activateBalance.bind(this)}
                      className="btn btn-outline-info"
                    >
                      {" "}
                      View Income Sheet
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {" "}
                    <button
                      type="reset"
                      onClick={this.emptydata.bind(this)}
                      className="btn btn-outline-danger"
                    >
                      Reset Database
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <NotificationContainer />
        <div>
          {this.state.value !== 0 ? (
            <ProgressBar
              animated
              variant={this.state.kind}
              now={this.state.value}
            />
          ) : null}
        </div>
        <div className="relative" id="balance">
          <this.Displayincomestatement />
        </div>
        <section className="clean-block features">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5 feature-box">
                <i className="icon-star icon"></i>
                <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Balance Sheet</h4>
                <p>
                  &nbsp;financial statement that reports a company's assets,
                  liabilities and shareholders' equity.
                </p>
              </div>
              <div className="col-md-5 feature-box">
                <i className="icon-pencil icon"></i>
                <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Income Statement</h4>
                <p>
                  &nbsp;financial statement&nbsp;that shows you how profitable
                  your business was over a given reporting period.
                </p>
              </div>
              <div className="col-md-5 feature-box">
                <i className="icon-screen-smartphone icon"></i>
                <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result</h4>
                <p>
                  financial statement that reports the Result of profit or loss
                  at the end of the year
                </p>
              </div>
              <div className="col-md-5 feature-box">
                <i className="icon-refresh icon"></i>
                <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Calculations</h4>
                <p>TVA calculations and loans and other calculations&nbsp;</p>
              </div>
            </div>
          </div>
        </section>
        <section className="clean-block about-us">
          <div className="container">
            <div className="block-heading">
              <h2 className="text-info">About Us</h2>
              <p>
                This Website is made by Bootstrap and Reactjs with&nbsp;MongoDB
                Database to make accounting calculations&nbsp;
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default IncomeStatement;
