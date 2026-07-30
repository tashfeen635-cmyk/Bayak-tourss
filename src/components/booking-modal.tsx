"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  MapPin,
  CheckCircle,
  Send,
  ChevronDown,
  Users,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const GROUP_TYPES = [
  "Solo Traveler",
  "Couple",
  "Family",
  "Friends",
  "Corporate Group",
  "Student Group",
  "Other",
] as const;

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso",
  "Burundi","Cambodia","Cameroon","Canada","Central African Republic","Chad",
  "Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
  "East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea",
  "Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia",
  "Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands",
  "Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal",
  "Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
  "North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama",
  "Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino",
  "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan",
  "Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania",
  "Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey",
  "Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName?: string;
  tourDuration?: string;
  apiEndpoint?: string;
  destinationId?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  tourName,
  tourDuration,
  apiEndpoint = "/api/bookings",
  destinationId,
}: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryQuery, setCountryQuery] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  const [groupType, setGroupType] = useState<string>("");
  const countryRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");

  const filteredCountries = useMemo(() => {
    if (!countryQuery) return COUNTRIES;
    const q = countryQuery.toLowerCase();
    return COUNTRIES.filter((c) => c.toLowerCase().includes(q));
  }, [countryQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setShowCountryList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resetForm = () => {
    setSubmitted(false);
    setSubmitting(false);
    setError(null);
    setCountryQuery("");
    setGroupType("");
    setShowCountryList(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("");
    setAdults(1);
    setChildren(0);
    setSpecialRequests("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: Record<string, unknown> = {
      customerName: fullName,
      email,
      phone,
      country: countryQuery,
      city,
      destinationId: destinationId || "",
      destinationName: tourName || "",
      groupType,
      adults,
      children,
      duration: tourDuration || "",
      specialRequests,
    };

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={handleClose}
        >
          <button
            className="absolute right-4 top-4 z-[60] text-white/70 transition-colors hover:text-white"
            onClick={handleClose}
          >
            <X className="h-8 w-8" />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card shadow-2xl scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center px-8 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-bold">
                  Booking Confirmed!
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Thank you{tourName ? ` for booking the ${tourName} tour` : ""}!
                  We&apos;ve received your request and will contact you on
                  WhatsApp within 24 hours to finalize the details.
                </p>
                <Button
                  className="mt-8 rounded-full bg-gold px-8 text-white hover:bg-gold-dark"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </div>
            ) : (
              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold">
                    {tourName ? "Book Your Trip" : "Create Your Trip"}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill in your details and we&apos;ll get back to you shortly.
                  </p>
                </div>

                {tourName && (
                  <div className="mb-6 rounded-xl border border-gold/20 bg-gold/5 p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold" />
                      <span className="text-sm font-semibold">{tourName}</span>
                    </div>
                    {tourDuration && (
                      <div className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {tourDuration}
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Ahmed Khan"
                      required
                      className="rounded-xl"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="ahmed@example.com"
                      required
                      className="rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Phone / WhatsApp{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="+92 314 6605966"
                      required
                      className="rounded-xl"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div ref={countryRef} className="relative">
                    <label className="mb-1.5 block text-sm font-medium">
                      Current Country
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="Search country..."
                        value={countryQuery}
                        onChange={(e) => {
                          setCountryQuery(e.target.value);
                          setShowCountryList(true);
                        }}
                        onFocus={() => setShowCountryList(true)}
                        className="rounded-xl pr-10"
                        autoComplete="off"
                      />
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    {showCountryList && filteredCountries.length > 0 && (
                      <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-border bg-card shadow-lg scrollbar-none">
                        {filteredCountries.slice(0, 50).map((country) => (
                          <button
                            key={country}
                            type="button"
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gold/10 hover:text-gold"
                            onClick={() => {
                              setCountryQuery(country);
                              setShowCountryList(false);
                            }}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Current City
                    </label>
                    <Input
                      placeholder="e.g. Dubai, London, New York"
                      className="rounded-xl"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Travel Group Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {GROUP_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setGroupType(type)}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                            groupType === type
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-border bg-card text-muted-foreground hover:border-gold/30 hover:text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        <Users className="mr-1 inline h-3.5 w-3.5 text-gold" />
                        Adults <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="50"
                        required
                        className="rounded-xl"
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        <Users className="mr-1 inline h-3.5 w-3.5 text-gold" />
                        Children
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="30"
                        className="rounded-xl"
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {tourDuration && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        <Clock className="mr-1 inline h-3.5 w-3.5 text-gold" />
                        Tour Duration
                      </label>
                      <Input
                        value={tourDuration}
                        readOnly
                        className="rounded-xl bg-muted/50 text-muted-foreground"
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Special Requests{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Textarea
                      placeholder="Any dietary needs, accessibility requirements, or special occasions..."
                      rows={3}
                      className="rounded-xl"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 rounded-full bg-gold px-6 text-white hover:bg-gold-dark"
                    >
                      {submitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {submitting ? "Submitting..." : "Confirm Booking"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full border-border px-6"
                      onClick={handleClose}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
