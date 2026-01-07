import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "wouter";
import { CONTACT_EMAIL, PAIN_POINTS, FEATURES } from "@/lib/config";
import { ChevronDown, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    teachingFormat: "",
    weeklyHours: "",
    commuteHours: "",
    biggestPain: "",
    subjects: "",
    optionalNotes: "",
    interviewOptIn: false,
    willingnessToPayOptIn: false,
    receiveUpdates: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    const hasContact = formData.whatsapp || formData.email;
    if (!formData.name || !hasContact) {
      toast.error("Please provide your name and at least one contact method (WhatsApp or Email)");
      return false;
    }
    return true;
  };

  const submitFormMutation = trpc.form.submit.useMutation({
    onSuccess: () => {
      setFormSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          whatsapp: "",
          email: "",
          teachingFormat: "",
          weeklyHours: "",
          commuteHours: "",
          biggestPain: "",
          subjects: "",
          optionalNotes: "",
          interviewOptIn: false,
          willingnessToPayOptIn: false,
          receiveUpdates: false,
        });
        setFormSubmitted(false);
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await submitFormMutation.mutateAsync({
        name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email,
        teachingFormat: formData.teachingFormat,
        weeklyHours: formData.weeklyHours,
        commuteHours: formData.commuteHours,
        biggestPain: formData.biggestPain,
        subjects: formData.subjects,
        optionalNotes: formData.optionalNotes,
        interviewOptIn: formData.interviewOptIn,
        willingnessToPayOptIn: formData.willingnessToPayOptIn,
        receiveUpdates: formData.receiveUpdates,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-primary">TutorAtlas</div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#solution" className="text-sm hover:text-primary transition-colors">
              Solution
            </a>
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </a>
            <a href="#outcomes" className="text-sm hover:text-primary transition-colors">
              Outcomes
            </a>
            <a href="#founding-cohort" className="text-sm hover:text-primary transition-colors">
              Founding Cohort
            </a>
            <a href="#faq" className="text-sm hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#join" className="text-sm font-semibold text-accent hover:opacity-80">
              Join
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-accent/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                AI workspace for home tutors
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-primary">
                Stop guessing travel time between home-tuition lessons.
              </h1>
              <p className="text-lg text-foreground/90 leading-relaxed">
                An AI workspace that gives home tutors more time to be the mentor their students need.
              </p>
              <p className="text-base text-foreground/80">
                TutorAtlas is built to make your day <strong>fuss-free</strong> so you can focus on what you do best: <strong>teaching</strong>.
              </p>

              {/* Value Bullets */}
              <div className="space-y-3 pt-4">
                {[
                  "Commute Intelligence: Check if a new student fits your route before you say yes.",
                  "Paper-to-Feedback (Math/Science): Snap a photo of worksheets to speed up marking and feedback.",
                  "Tomorrow Prep Assistant: Turn today's results into the right practice materials for the next lesson.",
                  "Less admin: Parent updates + payments in minutes, not midnight.",
                ].map((bullet, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/90">{bullet}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a href="#join" className="inline-block">
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                    Join Early Access
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10"
                >
                  Book a 15-min Interview
                </Button>
              </div>

              <p className="text-xs text-muted-foreground pt-4">
                Built for Singapore home tutors. Early access is limited to a small founding cohort.
              </p>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block">
              <div className="aspect-square rounded-2xl overflow-hidden border border-border/50 shadow-lg">
                <img
                  src="/images/solution-illustration.jpg"
                  alt="TutorAtlas workspace illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Home tuition pays well. The daily grind is the problem.
            </h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              If you're fully booked, your real workload isn't just teaching—it's <strong>commuting</strong>, rescheduling, chasing payments, <strong>marking</strong>, and prepping tomorrow's materials after a long day. Most tutors stitch together WhatsApp + calendars + notes + bank transfers and lose hours every week.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Back-to-back lessons look fine on a calendar… until travel time ruins it.",
                "Marking and writing feedback steals the time you wanted for teaching.",
                "Planning tomorrow's lesson after a full day out is exhausting.",
                "Parents want progress visibility, but updates take time.",
              ].map((pain, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="text-2xl">💭</div>
                  <p className="text-foreground/80">{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            TutorAtlas makes tutoring operations effortless.
          </h2>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl">
            TutorAtlas is designed for busy, in-demand tutors who want <strong>less fuss</strong>. It helps you make faster decisions, stay on time, and keep parents confident—without adding more work.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Commute Intelligence Card */}
            <div className="bg-white rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Commute Intelligence</h3>
              <p className="text-foreground/80 mb-4">
                Instantly check whether a new home-tuition gig fits your schedule—based on <strong>public transport travel time</strong> between lessons. Includes "As of Google Maps at [time]; estimates may vary."
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground font-semibold">Outcomes:</p>
                <p className="text-sm text-foreground/70">Accept the right gigs faster · Avoid risky back-to-backs · Reduce lateness stress</p>
              </div>
            </div>

            {/* Paper-to-Feedback Card */}
            <div className="bg-white rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Paper-to-Feedback (Math/Science)</h3>
              <p className="text-foreground/80 mb-4">
                Keep lessons <strong>paper-first</strong> (no devices). After the lesson, snap a photo of completed worksheets to generate <strong>quick marks per question</strong> and a feedback draft—best suited for <strong>deterministic subjects</strong> (e.g., math/science). You stay in control: review before sharing.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground italic">Best for deterministic questions; open-ended subjects require manual review.</p>
              </div>
            </div>

            {/* Tomorrow Prep Assistant Card */}
            <div className="bg-white rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Tomorrow Prep Assistant</h3>
              <p className="text-foreground/80 mb-4">
                After a long day travelling, the hardest part is planning the next lesson. Upload what you have—similar worksheets, rough drafts, or existing materials—and TutorAtlas helps you generate <strong>student-ready practice</strong> at the right difficulty.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground/70">Targeted practice based on recent performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary">How it works (simple)</h2>

          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {[
              { num: "1", text: "Add your schedule + student locations (postal code level)." },
              { num: "2", text: "A new lead comes in → tap Check Fit." },
              { num: "3", text: "TutorAtlas tells you if it fits—and what it does to your travel time." },
              { num: "4", text: "Teach as you normally do (paper-first). Snap a photo to speed up marking (math/science)." },
              { num: "5", text: "Generate a parent update and invoice in minutes." },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold mb-3">
                  {step.num}
                </div>
                <p className="text-sm text-center text-foreground/80">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-6 text-center">
            <p className="text-foreground/80 font-semibold">
              You stay in control. Nothing is sent to parents without your approval.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary">
            Everything you need—without the chaos.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-lg p-6 border border-border hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-foreground/80 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section id="outcomes" className="py-20 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary">
            For tutors who want to focus on teaching, not admin.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "More time for what matters",
                description: "Spend less time on logistics and more time being the mentor your students need.",
              },
              {
                title: "Less burnout",
                description: "Reduce the daily stress of juggling schedules, payments, and prep work.",
              },
              {
                title: "Better student outcomes",
                description: "Faster feedback and smarter prep materials help students progress faster.",
              },
            ].map((outcome, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{outcome.title}</h3>
                <p className="text-foreground/80">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Cohort Section */}
      <section id="founding-cohort" className="py-20 md:py-32 bg-background">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Join our founding cohort.
            </h2>
            <p className="text-lg text-foreground/80">
              We're looking for 10 high-quality tutors to validate demand and shape the product. Early access is limited and selective.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-border space-y-4">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-foreground/80">Direct input on product roadmap</p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-foreground/80">Early pricing and lifetime benefits</p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-foreground/80">1-on-1 onboarding and support</p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-foreground/80">Help us build the future of tutor operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-white">
        <div className="container max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary text-center">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Is my data private?",
                a: "Yes. We only collect the information you provide. We don't ask for sensitive student data. See our Privacy Policy for details.",
              },
              {
                q: "Is TutorAtlas paper-first?",
                a: "Yes. You teach as you normally do (paper-first). TutorAtlas helps with scheduling, marking photos, and prep—not replacing your teaching method.",
              },
              {
                q: "What subjects does Paper-to-Feedback work best for?",
                a: "Best for deterministic subjects like Math and Science. Open-ended subjects (e.g., essay writing) require manual review.",
              },
              {
                q: "Will TutorAtlas send things to parents without my approval?",
                a: "No. You stay in control. Nothing is sent to parents without your review and approval.",
              },
              {
                q: "What if the commute estimate is wrong?",
                a: "Commute estimates are based on Google Maps and may vary. Always use your own judgment. We include a timestamp disclaimer.",
              },
              {
                q: "How much will TutorAtlas cost?",
                a: "We're still validating demand. Founding cohort members will get special early pricing. Pricing details coming soon.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <summary className="flex items-center justify-between font-semibold text-foreground">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-foreground/80 mt-3 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join" className="py-20 md:py-32 bg-background">
        <div className="container max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary text-center">
            Join early access
          </h2>
          <p className="text-lg text-foreground/80 text-center mb-12">
            Tell us about yourself and your tutoring practice. We'll be in touch within 48 hours.
          </p>

          {formSubmitted ? (
            <div className="bg-white rounded-xl p-8 border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Thank you!</h3>
              <p className="text-foreground/80 mb-4">
                We've received your submission. We'll review your details and reach out within 48 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                In the meantime, check out our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-border space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-semibold">
                  Your name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., Ben"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-background border-border"
                  required
                />
              </div>

              {/* Contact Methods */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-foreground font-semibold flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp number
                  </Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="e.g., 9xxx xxxx"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g., ben@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                * Please provide at least one contact method (WhatsApp or Email)
              </p>

              {/* Teaching Format */}
              <div className="space-y-2">
                <Label htmlFor="teachingFormat" className="text-foreground font-semibold">
                  Teaching format
                </Label>
                <Select value={formData.teachingFormat} onValueChange={(value) => handleSelectChange("teachingFormat", value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select teaching format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-person (home tuition)</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="hybrid">Hybrid (both)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Weekly Hours */}
              <div className="space-y-2">
                <Label htmlFor="weeklyHours" className="text-foreground font-semibold">
                  Weekly teaching hours (approximate)
                </Label>
                <Select value={formData.weeklyHours} onValueChange={(value) => handleSelectChange("weeklyHours", value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-10">0-10 hours</SelectItem>
                    <SelectItem value="11-20">11-20 hours</SelectItem>
                    <SelectItem value="21-30">21-30 hours</SelectItem>
                    <SelectItem value="31-40">31-40 hours</SelectItem>
                    <SelectItem value="40+">40+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Commute Hours */}
              <div className="space-y-2">
                <Label htmlFor="commuteHours" className="text-foreground font-semibold">
                  Average commuting hours per day
                </Label>
                <Select value={formData.commuteHours} onValueChange={(value) => handleSelectChange("commuteHours", value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 hour</SelectItem>
                    <SelectItem value="1-2">1-2 hours</SelectItem>
                    <SelectItem value="2-3">2-3 hours</SelectItem>
                    <SelectItem value="3+">3+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Biggest Pain */}
              <div className="space-y-2">
                <Label htmlFor="biggestPain" className="text-foreground font-semibold">
                  What's your biggest pain point? *
                </Label>
                <Select value={formData.biggestPain} onValueChange={(value) => handleSelectChange("biggestPain", value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select your biggest pain" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAIN_POINTS.map((pain) => (
                      <SelectItem key={pain} value={pain}>
                        {pain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subjects */}
              <div className="space-y-2">
                <Label htmlFor="subjects" className="text-foreground font-semibold">
                  Subjects you teach (optional)
                </Label>
                <Input
                  id="subjects"
                  name="subjects"
                  type="text"
                  placeholder="e.g., Math, Science, English"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  className="bg-background border-border"
                />
              </div>

              {/* Optional Notes */}
              <div className="space-y-2">
                <Label htmlFor="optionalNotes" className="text-foreground font-semibold">
                  Anything else you'd like to share? (optional)
                </Label>
                <Textarea
                  id="optionalNotes"
                  name="optionalNotes"
                  placeholder="e.g., I have tons of worksheets but hard to find the right ones"
                  value={formData.optionalNotes}
                  onChange={handleInputChange}
                  className="bg-background border-border min-h-24"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="interviewOptIn"
                    checked={formData.interviewOptIn}
                    onCheckedChange={(checked) => handleCheckboxChange("interviewOptIn", checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="interviewOptIn" className="text-sm text-foreground/80 cursor-pointer">
                    I'm interested in booking a 15-minute interview to discuss TutorAtlas
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="willingnessToPayOptIn"
                    checked={formData.willingnessToPayOptIn}
                    onCheckedChange={(checked) => handleCheckboxChange("willingnessToPayOptIn", checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="willingnessToPayOptIn" className="text-sm text-foreground/80 cursor-pointer">
                    I would consider paying for TutorAtlas if it solves my #1 pain
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="receiveUpdates"
                    checked={formData.receiveUpdates}
                    onCheckedChange={(checked) => handleCheckboxChange("receiveUpdates", checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="receiveUpdates" className="text-sm text-foreground/80 cursor-pointer">
                    I'd like to receive product updates and news from TutorAtlas
                  </label>
                </div>
              </div>

              {/* Consent Text */}
              <div className="bg-muted/50 border border-border rounded-lg p-4 text-xs text-muted-foreground space-y-2">
                <p>
                  By submitting this form, you agree to TutorAtlas contacting you about early access and interviews. Your data is protected under our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>.
                </p>
                <p>
                  For questions, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Join Early Access"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">TutorAtlas</h4>
              <p className="text-sm opacity-80">AI workspace for home tutors</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Product</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#solution" className="hover:opacity-100">Solution</a></li>
                <li><a href="#features" className="hover:opacity-100">Features</a></li>
                <li><a href="#faq" className="hover:opacity-100">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Legal</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="/privacy" className="hover:opacity-100">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:opacity-100">Terms of Use</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Contact</h5>
              <p className="text-sm opacity-80">
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:opacity-100">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2025 TutorAtlas. All rights reserved. Built for Singapore home tutors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
