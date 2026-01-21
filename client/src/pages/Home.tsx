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
import { trpc } from "@/lib/trpc";
import { CONTACT_EMAIL } from "@/lib/config";
import { ChevronDown, Mail, MessageCircle, CheckCircle2, Clock, MapPin, Star } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    telegram: "",
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
  const [selectedPersona, setSelectedPersona] = useState<"part-time" | "full-time" | "centre">("part-time");

  const submitFormMutation = trpc.form.submit.useMutation({
    onSuccess: () => {
      setFormSubmitted(true);
      toast.success("Thank you! We'll be in touch within 48 hours.");
      setTimeout(() => {
        setFormData({
          name: "",
          whatsapp: "",
          email: "",
          telegram: "",
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
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await submitFormMutation.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const personaContent = {
    "part-time": {
      subhead: "Limited time windows. Location-constrained. Every hour counts.",
      benefits: [
        "Find the 3 suitable assignments from 60 daily Telegram blasts",
        "Know commute fit instantly—no more manual postal code mapping",
        "Stop getting ghosted after repetitive form submissions"
      ],
      target: "Target: Cut lead sifting time by 50–80%"
    },
    "full-time": {
      subhead: "Payment chasing steals your time. Scheduling is second. You need centre-level polish without centre overhead.",
      benefits: [
        "Get paid without chasing: lesson + payment log in seconds (pilot)",
        "Multi-stop schedule sanity: commute-fit and route viability before you apply",
        "Compete with centres at the same price—without hiring staff"
      ],
      target: "Target: Reduce payment chasing time by 40–60% (pilot)"
    },
    "centre": {
      subhead: "Owner-operator juggling teaching + enquiries + scheduling + admin.",
      benefits: [
        "Capture enquiries and schedule trials with fewer message loops (pilot)",
        "See your week's timetable at a glance, including reschedules (pilot)",
        "Standardize parent updates so quality scales beyond you (pilot)"
      ],
      target: "Target: Reduce parent coordination time by 30–50% (pilot)"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/images/tutoratlas_logo_horizontal.png" 
              alt="Tutor Atlas" 
              className="h-8"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#solution" className="text-sm font-medium hover:text-primary transition-colors">
              Solution
            </a>
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#outcomes" className="text-sm font-medium hover:text-primary transition-colors">
              Outcomes
            </a>
            <a href="#cohort" className="text-sm font-medium hover:text-primary transition-colors">
              Founding Cohort
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>
          <a href="#join">
            <Button variant="default" size="sm">
              Join
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-sm font-medium px-4 py-2 rounded-full bg-accent/10 text-accent-foreground">
                  AI workspace for home tutors
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Stop getting ghosted by tuition assignments
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                An AI concierge that gives Singapore home tutors more time to be the mentor their students need—not scrolling Telegram or filling forms.
              </p>

              <p className="text-base text-muted-foreground">
                Tutor Atlas is built to make your day <span className="font-semibold text-foreground">fuss-free</span> so you can focus on what you do best: <span className="font-semibold text-foreground">teaching</span>.
              </p>

              {/* CTA */}
              <div className="pt-6">
                <a href="#join" className="inline-block">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Join Early Access
                  </Button>
                </a>
              </div>

              <p className="text-xs text-muted-foreground pt-4">
                Built for Singapore home tutors. Early access is limited to a small founding cohort.
              </p>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/solution-illustration.jpg"
                  alt="Tutor Atlas workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Selector */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Who is this for?</h2>
              <p className="text-muted-foreground">Pick your mode to see how Tutor Atlas fits your workflow</p>
            </div>

            {/* Persona Tabs */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedPersona === "part-time" ? "default" : "outline"}
                onClick={() => setSelectedPersona("part-time")}
                className="flex-1 sm:flex-none"
              >
                Part-time Tutor
              </Button>
              <Button
                variant={selectedPersona === "full-time" ? "default" : "outline"}
                onClick={() => setSelectedPersona("full-time")}
                className="flex-1 sm:flex-none"
              >
                Full-time Tutor
              </Button>
              <Button
                variant={selectedPersona === "centre" ? "default" : "outline"}
                onClick={() => setSelectedPersona("centre")}
                className="flex-1 sm:flex-none"
              >
                Centre Owner (Pilot)
              </Button>
            </div>

            {/* Persona Content */}
            <div className="bg-card rounded-xl p-8 shadow-sm border">
              <p className="text-lg text-muted-foreground mb-6">
                {personaContent[selectedPersona].subhead}
              </p>
              <ul className="space-y-3 mb-6">
                {personaContent[selectedPersona].benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-accent">{personaContent[selectedPersona].target}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Reality Section */}
      <section id="solution" className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Today's workflow is broken</h2>
              <p className="text-xl text-muted-foreground">
                Scroll, sift, retype, wait, get ghosted—repeat
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-destructive" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">~60 Telegram blasts daily</h3>
                    <p className="text-sm text-muted-foreground">
                      But only ~3 suitable assignments every 2 weeks for a constrained tutor
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-destructive" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Repetitive form spam</h3>
                    <p className="text-sm text-muted-foreground">
                      Re-enter the same details (name, phone, availability, rate) for every Google Form
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-destructive" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">0–1 replies is common</h3>
                    <p className="text-sm text-muted-foreground">
                      Even after effort spent applying, you often hear nothing back
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-destructive" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Postal code guesswork</h3>
                    <p className="text-sm text-muted-foreground">
                      Manual map checks to assess if commute fits your schedule
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-[280px] md:max-w-[320px] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/images/telegram-blast-screenshot.png"
                    alt="Telegram tuition assignment blasts showing 60+ messages"
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-full max-w-[280px] md:max-w-[320px] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/images/google-form-screenshot.png"
                    alt="Typical Google Form requiring repetitive data entry"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground italic max-w-[320px]">
                  The current reality: high volume, low signal, zero transparency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">What changes with Tutor Atlas</h2>
              <p className="text-xl text-muted-foreground">
                A tutor workstation that removes the repetitive, low-value work
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">AI Assignment Concierge</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Set preferences once (subjects, levels, locations, time windows, rate floor)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Get 3–5 curated matches instead of scrolling 60 posts</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>One-tap apply from your saved profile—no retyping</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Commute Intelligence</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Convert postal codes into real commute estimates</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>"Fits your schedule?" check with travel time buffer</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Optional route day view for multi-stop tutors</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Terms & Commission Transparency</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>See fee/commission rules before you apply</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>"Net hourly" estimator (after commute + any stated fee)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Know the deal before you invest your time</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Status & Visibility</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Track what you applied for</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>See if it's still open or closed</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Reduce dead-end applications by 30–60% (target)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Verified Reviews (Pilot)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Credible proof layer so your results speak louder than labels</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Verification, moderation, and dispute process included</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Differentiate beyond MOE signaling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
              <p className="text-xl text-muted-foreground">
                Three steps. Designed for &lt;2 minutes per day.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold">Set preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Subjects, levels, locations, time windows, rate floor—once
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  2
                </div>
                <h3 className="text-xl font-semibold">Get shortlist</h3>
                <p className="text-sm text-muted-foreground">
                  3–5 curated matches arrive daily, filtered by your criteria
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  3
                </div>
                <h3 className="text-xl font-semibold">One-tap apply</h3>
                <p className="text-sm text-muted-foreground">
                  Apply with saved profile + see commute fit + track status
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section id="outcomes" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Target outcomes</h2>
              <p className="text-xl text-muted-foreground">
                Beta benchmarks we'll measure with the founding cohort
              </p>
              <p className="text-sm text-muted-foreground italic">
                These are targets, not guarantees. We're validating them together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-accent">50–80%</span>
                  <span className="text-sm text-muted-foreground">reduction</span>
                </div>
                <p className="text-sm font-medium">Lead sifting time</p>
                <p className="text-xs text-muted-foreground mt-2">
                  From scrolling 60 posts to reviewing 3–5 curated matches
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-accent">&lt;60s</span>
                  <span className="text-sm text-muted-foreground">per lead</span>
                </div>
                <p className="text-sm font-medium">Application time</p>
                <p className="text-xs text-muted-foreground mt-2">
                  From minutes of form-filling to one-tap apply
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-accent">&lt;15s</span>
                  <span className="text-sm text-muted-foreground">decision</span>
                </div>
                <p className="text-sm font-medium">Commute-fit check</p>
                <p className="text-xs text-muted-foreground mt-2">
                  From manual map lookups to instant route visibility
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-accent">30–60%</span>
                  <span className="text-sm text-muted-foreground">reduction</span>
                </div>
                <p className="text-sm font-medium">Dead-end applications</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Better filtering + status signals = fewer wasted efforts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">What we're NOT promising</h2>
              <p className="text-xl text-muted-foreground">
                Honest about what Tutor Atlas does (and doesn't) do
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">❌ We do NOT guarantee placements</h3>
                <p className="text-sm text-muted-foreground">
                  Tutor Atlas is a workstation that reduces wasted effort and increases hit-rate through better filtering, faster applying, and clearer commute fit. We don't promise guaranteed students or earnings.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">✅ We DO reduce friction and uncertainty</h3>
                <p className="text-sm text-muted-foreground">
                  By sitting on top of how you already operate (Telegram, WhatsApp, Maps), we remove the repetitive, low-value work so you can focus on teaching.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">🔒 Reviews have safeguards</h3>
                <p className="text-sm text-muted-foreground">
                  Verified-only, moderation, right-to-respond, and dispute workflow (pilot rules). We're building this carefully with the founding cohort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Cohort Section */}
      <section id="cohort" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Join the founding cohort</h2>
              <p className="text-xl text-muted-foreground">
                Early access + influence the roadmap + founder-tier benefits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-sm border text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold">Early access</h3>
                <p className="text-sm text-muted-foreground">
                  Be among the first to use Tutor Atlas before public launch
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold">Shape the product</h3>
                <p className="text-sm text-muted-foreground">
                  Direct feedback loops and priority roadmap influence
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold">Founder benefits</h3>
                <p className="text-sm text-muted-foreground">
                  Potential founder-tier pricing and exclusive perks
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <p className="text-sm text-muted-foreground text-center">
                <strong>What we ask:</strong> Honest feedback, willingness to test features, and help us understand what actually works for your workflow. If you know 1–2 other tutors who'd benefit, we'd love an introduction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Will this actually get me students?</h3>
                <p className="text-sm text-muted-foreground">
                  We do not promise guaranteed placement. We reduce wasted effort and increase hit-rate by better filtering, faster applying, and clearer commute fit. You still need to apply and win the assignment—we just make that process less painful.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Sounds like more overhead. I'm busy.</h3>
                <p className="text-sm text-muted-foreground">
                  Set preferences once. Daily shortlist comes to you. Designed for &lt;2 minutes/day. The goal is to save you time, not add work.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">What about privacy? Will you sell my data or share with agencies?</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Explicit pledge:</strong> We do not sell your data. We do not share with agencies or tuition centres. Data minimization: we only collect what's needed for the features you use. You control what you share. In beta, we focus on tutor preferences and assignment details—sensitive student info is avoided unless required for a feature you explicitly enable.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Reviews can be unfair.</h3>
                <p className="text-sm text-muted-foreground">
                  Verified-only, moderation, right-to-respond, dispute workflow (pilot rules). We're building this carefully to be fair and credible, not a free-for-all.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Agencies already exist. Why is this different?</h3>
                <p className="text-sm text-muted-foreground">
                  Tutor Atlas sits on top of existing channels (Telegram, agencies). You keep your options. We remove friction and increase professionalism. Think of it as a workstation, not a replacement.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">I run my own centre. I don't apply to Telegram assignments.</h3>
                <p className="text-sm text-muted-foreground">
                  That's a valid different workflow. We can pilot a <strong>centre-mode track</strong> focused on enquiry capture, scheduling/trials, parent updates, and basic admin. If you still take occasional 1:1 or overflow students, the concierge can also filter for your centre's radius.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-bold">Join the founding cohort</h2>
                <p className="text-muted-foreground">
                  We'll reach out within 48 hours to schedule a 15-minute chat
                </p>
              </div>

              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold">Thank you!</h3>
                  <p className="text-muted-foreground">
                    We'll be in touch within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* Contact Methods */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="+65 XXXX XXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * At least one contact method (WhatsApp or Email) is required
                  </p>

                  {/* Telegram Handle */}
                  <div className="space-y-2">
                    <Label htmlFor="telegram">Telegram Handle (Optional)</Label>
                    <Input
                      id="telegram"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleInputChange}
                      placeholder="@yourhandle"
                    />
                  </div>

                  {/* Teaching Format */}
                  <div className="space-y-2">
                    <Label htmlFor="teachingFormat">Teaching Format</Label>
                    <Select
                      value={formData.teachingFormat}
                      onValueChange={(value) => handleSelectChange("teachingFormat", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your teaching format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In-person">In-person</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Hybrid">Hybrid (both)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Weekly Hours */}
                  <div className="space-y-2">
                    <Label htmlFor="weeklyHours">Weekly Teaching Hours</Label>
                    <Select
                      value={formData.weeklyHours}
                      onValueChange={(value) => handleSelectChange("weeklyHours", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your weekly hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<5 hours">&lt;5 hours</SelectItem>
                        <SelectItem value="5-10 hours">5-10 hours</SelectItem>
                        <SelectItem value="10-15 hours">10-15 hours</SelectItem>
                        <SelectItem value="15-20 hours">15-20 hours</SelectItem>
                        <SelectItem value="20+ hours">20+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Commute Hours */}
                  <div className="space-y-2">
                    <Label htmlFor="commuteHours">Weekly Commute Hours</Label>
                    <Select
                      value={formData.commuteHours}
                      onValueChange={(value) => handleSelectChange("commuteHours", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your commute hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1 hour">&lt;1 hour</SelectItem>
                        <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                        <SelectItem value="2-3 hours">2-3 hours</SelectItem>
                        <SelectItem value="3-5 hours">3-5 hours</SelectItem>
                        <SelectItem value="5+ hours">5+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Biggest Pain */}
                  <div className="space-y-2">
                    <Label htmlFor="biggestPain">Biggest Pain Point</Label>
                    <Select
                      value={formData.biggestPain}
                      onValueChange={(value) => handleSelectChange("biggestPain", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="What frustrates you most?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Finding suitable assignments">Finding suitable assignments</SelectItem>
                        <SelectItem value="Travel time between lessons">Travel time between lessons</SelectItem>
                        <SelectItem value="Repetitive form filling">Repetitive form filling</SelectItem>
                        <SelectItem value="Getting ghosted after applying">Getting ghosted after applying</SelectItem>
                        <SelectItem value="Parent coordination and admin">Parent coordination and admin</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-2">
                    <Label htmlFor="subjects">Subjects You Teach</Label>
                    <Input
                      id="subjects"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleInputChange}
                      placeholder="e.g., Math, Science, English"
                    />
                  </div>

                  {/* Optional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="optionalNotes">Anything else we should know?</Label>
                    <Textarea
                      id="optionalNotes"
                      name="optionalNotes"
                      value={formData.optionalNotes}
                      onChange={handleInputChange}
                      placeholder="Optional: Share any specific challenges or ideas"
                      rows={4}
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="interviewOptIn"
                        checked={formData.interviewOptIn}
                        onCheckedChange={(checked) => handleCheckboxChange("interviewOptIn", checked as boolean)}
                      />
                      <Label htmlFor="interviewOptIn" className="text-sm font-normal leading-relaxed cursor-pointer">
                        I'm open to a 15-30 minute interview to share my workflow and pain points
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="willingnessToPayOptIn"
                        checked={formData.willingnessToPayOptIn}
                        onCheckedChange={(checked) => handleCheckboxChange("willingnessToPayOptIn", checked as boolean)}
                      />
                      <Label htmlFor="willingnessToPayOptIn" className="text-sm font-normal leading-relaxed cursor-pointer">
                        I'd consider paying for a tool that genuinely saves me time
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="receiveUpdates"
                        checked={formData.receiveUpdates}
                        onCheckedChange={(checked) => handleCheckboxChange("receiveUpdates", checked as boolean)}
                      />
                      <Label htmlFor="receiveUpdates" className="text-sm font-normal leading-relaxed cursor-pointer">
                        Keep me updated on Tutor Atlas progress
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Join Founding Cohort"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our{" "}
                    <Link href="/privacy" className="underline hover:text-foreground">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="underline hover:text-foreground">
                      Terms of Use
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img 
                src="/images/tutoratlas_logo_horizontal.png" 
                alt="Tutor Atlas" 
                className="h-6"
              />
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>© 2026 Tutor Atlas. Built for Singapore home tutors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
