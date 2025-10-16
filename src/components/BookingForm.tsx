import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().regex(/^(\+91)?[6-9]\d{9}$/, {
    message: "Please enter a valid Indian phone number.",
  }),
  agent: z.string({
    required_error: "Please select an agent.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const agents = [
  { value: "doctor", label: "Doctor's Clinic" },
  { value: "realestate", label: "Real Estate Agent" },
];

export function BookingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      agent: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Form submitted:", values);
      
      toast({
        title: "Call Initiated!",
        description: "You'll receive a call shortly.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Phone className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Book a Call</h1>
        <p className="text-muted-foreground">
          Schedule a consultation with our professional agents
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+91 XXXXX XXXXX"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Agent</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an agent" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.value} value={agent.value}>
                        {agent.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Phone className="mr-2 h-5 w-5" />
                Start Call
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
