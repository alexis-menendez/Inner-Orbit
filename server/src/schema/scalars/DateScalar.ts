// File: server/src/schemas/scalars/DateScalar.ts

import { GraphQLScalarType, Kind } from 'graphql';

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar for Date values',
  serialize(value) {
  if (!(value instanceof Date)) {
    throw new TypeError("Value is not a Date");
  }
  return value.toISOString();
},
  parseValue(value) {
    return typeof value === 'string' ? new Date(value) : null;
  },
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? new Date(ast.value) : null;
  },
});

export default DateScalar;