import { BookingForm } from "@/components/BookingForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elegant border border-border/50 backdrop-blur-sm">
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
