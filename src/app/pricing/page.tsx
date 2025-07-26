import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pricing & Credits</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started with SyntheticPush for free! Earn, buy, and use credits to unlock all features. No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How Credits Work</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
            <li>Sign up and get <span className="font-semibold">10 free credits</span> instantly.</li>
            <li>1 credit = 1 commit on any date you choose.</li>
            <li>Earn more credits by tweeting about us (feature coming soon!).</li>
            <li>Buy credits anytime—no subscription required.</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Buy Credits</h2>
          <div className="overflow-x-auto">
            Payment Gateway is not yet integrated, its under developemt, till then if you want to buy!
            {/* <table className="min-w-full bg-muted/50 rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Credits</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price (INR)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price/Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4">5</td>
                  <td className="px-6 py-4">₹10</td>
                  <td className="px-6 py-4">₹2.00</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="px-6 py-4">20</td>
                  <td className="px-6 py-4">₹35</td>
                  <td className="px-6 py-4">₹1.75</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">50</td>
                  <td className="px-6 py-4">₹75</td>
                  <td className="px-6 py-4">₹1.50</td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Pay</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
            <li>
              <span className="font-semibold">Buy Me a Coffee:</span> Use our <a href="https://www.buymeacoffee.com/satendra03" target="_blank" rel="noopener noreferrer" className="link">Buy Me a Coffee</a> link to pay instantly.
            </li>
            <li>
              <span className="font-semibold">UPI:</span> Pay via UPI to <span className="font-mono link">satendrakumarparteti@oksbi</span> (or as mentioned on the Buy Me a Coffee page).
            </li>
            <li>
              <span className="font-semibold">Manual Credit:</span> After payment, email your payment screenshot and GitHub ID to <a href="mailto:satendrakumarparteti.work@gmail.com" className="link">satendrakumarparteti.work@gmail.com</a>. We’ll update your credits within 24 hours.
            </li>
            <li className="text-muted-foreground">(Payment gateway integration coming soon!)</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">How do I know my credits are updated?</h3>
              <p className="text-muted-foreground">You can check your dashboard.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I get a refund?</h3>
              <p className="text-muted-foreground">All purchases are final. Please see our <a href="/refund-return-policy" className="link">Refund Policy</a> for details.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I earn unlimited credits?</h3>
              <p className="text-muted-foreground">You can earn credits through promotions, referrals, and social sharing (as available). Abuse is not tolerated.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is there a subscription?</h3>
              <p className="text-muted-foreground">No subscriptions! Pay only for what you use.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-2">Ready to get more credits?</h2>
          <p className="mb-6 text-lg">Sign up, earn, or buy credits and start using SyntheticPush today!</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;


