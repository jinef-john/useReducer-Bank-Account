import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useReducer } from "react";

export default function App() {
  const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
  };

  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function reducer(state, action) {
    if (!state.isActive && action.type != "openAccount") return state;

    switch (action.type) {
      case "openAccount":
        return {
          ...state,
          balance: 500,
          isActive: true,
        };
      case "deposit":
        return {
          ...state,
          balance: state.balance + action.payload,
        };
      case "withdraw":
        return {
          ...state,
          balance: state.balance - action.payload,
        };
      case "requestLoan":
        if (state.loan > 0) return state;
        return {
          ...state,
          loan: action.payload,
          balance: state.balance + action.payload,
        };
      case "payLoan":
        // if (!state.loan) return state;
        // if (state.loan < state.balance) alert("Weee");
        return {
          ...state,
          loan: 0,
          balance: state.balance - state.loan,
        };
      case "closeAccount":
        if (state.balance != 0 || state.loan > 0) return state;
        return initialState;
      default:
        throw new Error("unknown Action");
    }
  }

  return (
    <main className="">
      <Typography className="text-green-600 text-4xl md:text-6xl font-bold  text-center mx-auto">
        useReducer Bank Account
      </Typography>

      <div className=" flex flex-col  bg-gray-300 justify-center">
        <Typography variant="h3" className="mx-auto">
          Balance : {balance}
        </Typography>

        <Typography variant="h3" className="mx-auto">
          Loan : {loan}
        </Typography>
      </div>

      <div className="flex justify-center bg-gray-700">
        <div className="flex flex-col justify-center gap-5 mt-4 w-1/2 mr-10">
          <Button
            className="mx-auto"
            onClick={() => dispatch({ type: "openAccount" })}
            disabled={isActive}
          >
            Open Account
          </Button>
          <Button
            className="mx-auto"
            onClick={() => dispatch({ type: "deposit", payload: 150 })}
            disabled={!isActive}
          >
            Deposit 150
          </Button>
          <Button
            className="mx-auto"
            onClick={() => dispatch({ type: "withdraw", payload: 50 })}
            disabled={!isActive}
          >
            Withdraw 50
          </Button>
          <Button
            className="mx-auto"
            onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
            disabled={!isActive}
          >
            Request a loan of 5000
          </Button>
          <Button
            className="mx-auto"
            onClick={() => dispatch({ type: "payLoan" })}
            disabled={!isActive}
          >
            Pay Loan
          </Button>
          <Button
            className="mx-auto"
            onClick={() => dispatch({ type: "closeAccount" })}
            disabled={!isActive}
          >
            Close Account
          </Button>
        </div>
        <Card className="mt-6 w-96 ">
          <CardHeader color="blue-gray" className="relative h-50 mt-3">
            <img
              src="https://media.istockphoto.com/id/1414744533/photo/woman-hand-holding-credit-cards-and-using-smartphone-for-shopping-online-with-payment-on.webp?b=1&s=170667a&w=0&k=20&c=3EYPAKeQbFEgiK7ED-f2nM_9khgvdYxV0u5Uzq7EahY="
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Using React useReducer to manage state
            </Typography>
            <Typography>
              You can click on the buttons to perform actions on the bank. Open
              Account will open the account and allow you to perform other
              actions. You can not request a loan if you already have one. You
              can not close the account if you have a loan or balance.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
