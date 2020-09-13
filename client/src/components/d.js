import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
const getRates = gql`
{
  products(type: "DVD") {
    name
    price
  }
}`;
const Data = () => (
  <Query query={getRates} >
  {({ loading, error, data }) => {
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error :(</p>;
  return data.products.map(({ name, price }) => (
    <div key={name}>
      <p>{`${name}: ${price}`}</p>
    </div>
   ));
  }}
</Query>
);
export default Data;