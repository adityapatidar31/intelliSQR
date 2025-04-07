import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-blue-50 dark:bg-blue-950 px-4">
      <Card className="w-full max-w-3xl text-center shadow-xl p-6 rounded-2xl bg-white dark:bg-blue-900">
        <CardContent>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            Welcome to the Basic Login Form
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            This is a full-stack authentication app built using React, Tailwind,
            ShadCN UI, and Node.js with Prisma.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-100"
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
