import format from './formatter';

export default {
  VIEW_EXPENSE: (msg, context) => {
    msg.list = context.actionResult;
    msg.action = context.action;
    return msg;
  },
  REPORT_EXPENSE: (msg, context) => {
    const total = context.actionResult.reduce(add, 0);
    msg.message = `You have spent a total of ${format.toCurreny(total)} from ${format.toDate(context.start_date)} to ${format.toDate(context.end_date)}.`;
    return msg;
  }
};

const add = (accumulator, currentValue) => accumulator + currentValue.amount;
