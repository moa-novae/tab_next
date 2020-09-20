import React from "react";

export default function ({ group }) {
  const transactions = group.transactions.map((transaction) => (
    <div>
      <div>{transaction.amount}</div>
      <div>{group.users.find((u) => u.id === transaction["user_id"]).name}</div>
      <div>{transaction["transaction_date"]}</div>
    </div>
  ));
  return <div>{transactions}</div>;
}
