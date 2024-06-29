import React, { useEffect } from "react";
const StripePricingTable = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/pricing-table.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return React.createElement("stripe-pricing-table", {
        "pricing-table-id":  "prctbl_1PWYj1G6YGdG0nxh7H2qWWH7",
        "publishable-key": "pk_test_51NGxmVG6YGdG0nxhb7nVOVWQssOGMGcaamjya0jULE779lcE3SqCMlFl58LK9ymcXoLWV88xaRSuhCfjMR3lkLTT002oQgDEUK",
    });
};
export default StripePricingTable;