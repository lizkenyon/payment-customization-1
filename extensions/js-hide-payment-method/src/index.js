// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").InputQuery} InputQuery
* @typedef {import("../generated/api").FunctionResult} FunctionResult
* @typedef {import("../generated/api").HideOperation} HideOperation
*/

/**
* @type {FunctionResult}
*/
const NO_CHANGES = {
  operations: [],
};

// The @shopify/shopify_function package will use the default export as your function entrypoint
export default /**
    * @param {InputQuery} input
    * @returns {FunctionResult}
    */
// [START payment_customization-hide-payment-method.using_input_value]
  (input) => {
    // Get the cart total from the function input, and return early if it's below 100
    const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0");
    if (cartTotal < 100) {
      // You can use STDERR for debug logs in your function
      console.error("Cart total is not high enough, no need to hide the payment method.");
      return NO_CHANGES;
    }

    // Find the payment method to hide
    const hidePaymentMethod = input.paymentMethods
      .find(method => method.name.includes("Cash on Delivery"));
    if (!hidePaymentMethod) {
      return NO_CHANGES;
    }
// [END payment_customization-hide-payment-method.using_input_value]

    // The @shopify/shopify_function package applies JSON.stringify() to your function result
    // and writes it to STDOUT
// [START payment_customization-hide-payment-method.return_operations]
    return {
      operations: [{
        hide: {
          paymentMethodId: hidePaymentMethod.id
        }
      }]
    };
  };
// [END payment_customization-hide-payment-method.return_operations]
