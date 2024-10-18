import { useState } from "react";
import { MessageCircleIcon, StarIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Widget() {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  const onSelectStar = (index: number) => {
    setRating(index + 1);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      feedback: (form.elements.namedItem("feedback") as HTMLInputElement).value,
      rating,
    };
    setSubmitted(true);
    console.log("Form Submitted", data);
  };

  return (
    <div className="widget fixed bottom-4 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-md rounded-full shadow-lg hover:scale-105">
            <MessageCircleIcon className="mr-1 h-6 w-6" />
            Feedback
          </Button>
        </PopoverTrigger>
        <PopoverContent className="widget w-full max-w-md rounded-lg bg-card p-4 shadow-lg">
          {submitted ? (
            <div>
              <h3 className="text-lg font-bold">Thank you for your Feedback</h3>
              <p className="mt-4 text-muted-foreground">
                We appreciate your time and feedback. We will get back to you
                soon.
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold">Send us your Feedback</h3>
              <form className="space-y-2" onSubmit={submit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your Email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-5 w-5 cursor-pointer ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                        onClick={() => onSelectStar(index)}
                      />
                    ))}
                  </div>
                  <Button type="submit">Send</Button>
                </div>
              </form>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
