import { FormEvent, useState } from "react";

type BudgetLevel = "Budget" | "Mid-range" | "Splurge";
type TravelStyle = "Culture" | "Food" | "Nature" | "Relaxed";
type AvailableTime = "4 hours" | "6 hours" | "8 hours";

type TripStop = {
  name: string;
  time: string;
  cost: string;
};

type TripPlan = {
  city: string;
  budget: BudgetLevel;
  time: AvailableTime;
  travelStyle: TravelStyle;
  title: string;
  summary: string;
  stops: TripStop[];
};

type Recommendation = {
  plan: TripPlan;
  label: string;
  reason: string;
};

const tripPlans: TripPlan[] = [
  {
    city: "Mumbai",
    budget: "Budget",
    time: "6 hours",
    travelStyle: "Culture",
    title: "Old Bombay Icons",
    summary: "A compact route through historic landmarks, seaside views, and street snacks.",
    stops: [
      { name: "Gateway of India", time: "9:30 AM", cost: "Free" },
      { name: "Kala Ghoda lanes", time: "11:00 AM", cost: "Free" },
      { name: "Marine Drive snack break", time: "1:00 PM", cost: "Low" },
    ],
  },
  {
    city: "Mumbai",
    budget: "Mid-range",
    time: "8 hours",
    travelStyle: "Food",
    title: "Mumbai Flavor Trail",
    summary: "A generous day of cafes, local bites, and one classic coastal sunset.",
    stops: [
      { name: "Irani cafe breakfast", time: "9:00 AM", cost: "Medium" },
      { name: "Crawford Market tasting walk", time: "11:30 AM", cost: "Medium" },
      { name: "Bandra dinner stop", time: "5:00 PM", cost: "Medium" },
    ],
  },
  {
    city: "Mumbai",
    budget: "Splurge",
    time: "4 hours",
    travelStyle: "Relaxed",
    title: "Slow South Mumbai",
    summary: "A gentle premium afternoon with sea views, art, and a calm meal.",
    stops: [
      { name: "Museum gallery visit", time: "2:00 PM", cost: "Medium" },
      { name: "Colaba boutique browse", time: "3:30 PM", cost: "High" },
      { name: "Rooftop dinner", time: "5:00 PM", cost: "High" },
    ],
  },
  {
    city: "Delhi",
    budget: "Budget",
    time: "8 hours",
    travelStyle: "Culture",
    title: "Delhi Heritage Loop",
    summary: "A full day of monuments, markets, and a simple local lunch.",
    stops: [
      { name: "Lodhi Garden", time: "9:00 AM", cost: "Free" },
      { name: "Humayun's Tomb", time: "11:00 AM", cost: "Medium" },
      { name: "Chandni Chowk walk", time: "3:00 PM", cost: "Low" },
    ],
  },
  {
    city: "Delhi",
    budget: "Mid-range",
    time: "6 hours",
    travelStyle: "Food",
    title: "Markets and Meals",
    summary: "A lively food-forward plan with classic Delhi stops and easy pacing.",
    stops: [
      { name: "Khan Market coffee", time: "10:00 AM", cost: "Medium" },
      { name: "Old Delhi lunch crawl", time: "12:30 PM", cost: "Medium" },
      { name: "India Gate evening walk", time: "4:00 PM", cost: "Free" },
    ],
  },
  {
    city: "Delhi",
    budget: "Splurge",
    time: "4 hours",
    travelStyle: "Relaxed",
    title: "Elegant Delhi Afternoon",
    summary: "A calm museum visit followed by a premium meal and quiet garden time.",
    stops: [
      { name: "National Gallery visit", time: "1:00 PM", cost: "Low" },
      { name: "Lutyens lunch", time: "2:45 PM", cost: "High" },
      { name: "Sunder Nursery stroll", time: "4:30 PM", cost: "Medium" },
    ],
  },
  {
    city: "Jaipur",
    budget: "Budget",
    time: "6 hours",
    travelStyle: "Culture",
    title: "Pink City Starter",
    summary: "A simple first-day route through Jaipur's signature sights.",
    stops: [
      { name: "Hawa Mahal photo stop", time: "9:00 AM", cost: "Low" },
      { name: "City Palace area", time: "10:30 AM", cost: "Medium" },
      { name: "Bapu Bazaar browse", time: "1:30 PM", cost: "Low" },
    ],
  },
  {
    city: "Jaipur",
    budget: "Mid-range",
    time: "8 hours",
    travelStyle: "Food",
    title: "Jaipur Bites and Bazaars",
    summary: "A colorful plan with local snacks, palace views, and market time.",
    stops: [
      { name: "Kachori breakfast", time: "9:00 AM", cost: "Low" },
      { name: "Jantar Mantar", time: "11:00 AM", cost: "Medium" },
      { name: "Thali dinner", time: "5:30 PM", cost: "Medium" },
    ],
  },
  {
    city: "Jaipur",
    budget: "Splurge",
    time: "4 hours",
    travelStyle: "Relaxed",
    title: "Royal Slow Day",
    summary: "A short premium plan with views, shopping, and an elegant meal.",
    stops: [
      { name: "Amber Fort viewpoint", time: "2:00 PM", cost: "Medium" },
      { name: "Craft boutique stop", time: "3:45 PM", cost: "High" },
      { name: "Heritage hotel tea", time: "5:00 PM", cost: "High" },
    ],
  },
  {
    city: "Bengaluru",
    budget: "Budget",
    time: "4 hours",
    travelStyle: "Nature",
    title: "Garden City Pause",
    summary: "A calm half-day built around greenery and an easy cafe break.",
    stops: [
      { name: "Cubbon Park walk", time: "8:30 AM", cost: "Free" },
      { name: "State library stop", time: "10:00 AM", cost: "Free" },
      { name: "Budget cafe snack", time: "11:30 AM", cost: "Low" },
    ],
  },
  {
    city: "Bengaluru",
    budget: "Mid-range",
    time: "6 hours",
    travelStyle: "Food",
    title: "Coffee and Comfort Food",
    summary: "A relaxed day with breakfast classics, neighborhoods, and coffee.",
    stops: [
      { name: "South Indian breakfast", time: "9:00 AM", cost: "Low" },
      { name: "Indiranagar wander", time: "11:30 AM", cost: "Medium" },
      { name: "Specialty coffee stop", time: "2:00 PM", cost: "Medium" },
    ],
  },
  {
    city: "Bengaluru",
    budget: "Splurge",
    time: "8 hours",
    travelStyle: "Relaxed",
    title: "Soft City Escape",
    summary: "A premium easy-paced day with brunch, design shops, and a spa-style finish.",
    stops: [
      { name: "Leisure brunch", time: "10:00 AM", cost: "High" },
      { name: "Museum of Art and Photography", time: "12:30 PM", cost: "Medium" },
      { name: "Wellness dinner", time: "5:30 PM", cost: "High" },
    ],
  },
  {
    city: "Goa",
    budget: "Budget",
    time: "6 hours",
    travelStyle: "Nature",
    title: "Beach and Village Day",
    summary: "A low-cost coastal plan with beach time and a local village walk.",
    stops: [
      { name: "Morning beach walk", time: "8:30 AM", cost: "Free" },
      { name: "Village bakery stop", time: "10:30 AM", cost: "Low" },
      { name: "Sunset viewpoint", time: "4:30 PM", cost: "Free" },
    ],
  },
  {
    city: "Goa",
    budget: "Mid-range",
    time: "8 hours",
    travelStyle: "Food",
    title: "Goan Plates Day",
    summary: "A food-led day with markets, coastal lunch, and a breezy evening.",
    stops: [
      { name: "Mapusa market stroll", time: "9:30 AM", cost: "Low" },
      { name: "Seafood lunch", time: "1:00 PM", cost: "Medium" },
      { name: "Beach shack dinner", time: "6:00 PM", cost: "Medium" },
    ],
  },
  {
    city: "Goa",
    budget: "Splurge",
    time: "4 hours",
    travelStyle: "Relaxed",
    title: "Coastal Reset",
    summary: "A short premium plan with slow views, good food, and no rush.",
    stops: [
      { name: "Boutique resort lunch", time: "1:00 PM", cost: "High" },
      { name: "Quiet beach lounge", time: "2:45 PM", cost: "Medium" },
      { name: "Sunset mocktails", time: "5:00 PM", cost: "High" },
    ],
  },
  {
    city: "Kolkata",
    budget: "Budget",
    time: "8 hours",
    travelStyle: "Culture",
    title: "Classic Kolkata Day",
    summary: "A full but simple route through colonial architecture, books, and sweets.",
    stops: [
      { name: "Victoria Memorial lawns", time: "9:00 AM", cost: "Low" },
      { name: "College Street books", time: "12:00 PM", cost: "Low" },
      { name: "Prinsep Ghat evening", time: "5:00 PM", cost: "Free" },
    ],
  },
  {
    city: "Kolkata",
    budget: "Mid-range",
    time: "6 hours",
    travelStyle: "Food",
    title: "Sweets and Street Plates",
    summary: "A tasty city sampler with heritage streets and beloved snacks.",
    stops: [
      { name: "Kathi roll stop", time: "11:00 AM", cost: "Low" },
      { name: "Park Street lunch", time: "1:00 PM", cost: "Medium" },
      { name: "Mishti tasting", time: "3:30 PM", cost: "Low" },
    ],
  },
  {
    city: "Kolkata",
    budget: "Splurge",
    time: "4 hours",
    travelStyle: "Relaxed",
    title: "Park Street Easy Evening",
    summary: "An elegant short plan with a gallery, tea, and a classic dinner.",
    stops: [
      { name: "Gallery stop", time: "3:00 PM", cost: "Medium" },
      { name: "Tea room break", time: "4:30 PM", cost: "Medium" },
      { name: "Park Street dinner", time: "6:00 PM", cost: "High" },
    ],
  },
  {
    city: "Chennai",
    budget: "Budget",
    time: "4 hours",
    travelStyle: "Nature",
    title: "Marina Morning",
    summary: "A light coastal plan with beach air and an easy local breakfast.",
    stops: [
      { name: "Marina Beach walk", time: "7:30 AM", cost: "Free" },
      { name: "Mylapore breakfast", time: "9:00 AM", cost: "Low" },
      { name: "Temple tank stroll", time: "10:30 AM", cost: "Free" },
    ],
  },
  {
    city: "Chennai",
    budget: "Mid-range",
    time: "6 hours",
    travelStyle: "Culture",
    title: "Mylapore and Museums",
    summary: "A warm cultural route with temples, history, and filter coffee.",
    stops: [
      { name: "Kapaleeshwarar Temple", time: "9:00 AM", cost: "Free" },
      { name: "Government Museum", time: "11:30 AM", cost: "Medium" },
      { name: "Filter coffee stop", time: "2:00 PM", cost: "Low" },
    ],
  },
  {
    city: "Chennai",
    budget: "Splurge",
    time: "8 hours",
    travelStyle: "Relaxed",
    title: "Coastal Comfort Day",
    summary: "A premium gentle route with sea views, art, and a long dinner.",
    stops: [
      { name: "Art gallery visit", time: "11:00 AM", cost: "Medium" },
      { name: "ECR cafe drive", time: "2:00 PM", cost: "High" },
      { name: "Seaside dinner", time: "6:00 PM", cost: "High" },
    ],
  },
  {
    city: "Udaipur",
    budget: "Budget",
    time: "6 hours",
    travelStyle: "Culture",
    title: "Lake City Basics",
    summary: "A scenic budget day with palace views, ghats, and old-city lanes.",
    stops: [
      { name: "Gangaur Ghat", time: "9:00 AM", cost: "Free" },
      { name: "City Palace exterior", time: "10:30 AM", cost: "Low" },
      { name: "Old city market", time: "1:00 PM", cost: "Low" },
    ],
  },
  {
    city: "Udaipur",
    budget: "Mid-range",
    time: "4 hours",
    travelStyle: "Relaxed",
    title: "Lake Afternoon",
    summary: "A short easy plan with lake views, crafts, and a mellow meal.",
    stops: [
      { name: "Lake Pichola viewpoint", time: "3:00 PM", cost: "Free" },
      { name: "Craft shop stop", time: "4:00 PM", cost: "Medium" },
      { name: "Rooftop dinner", time: "5:30 PM", cost: "Medium" },
    ],
  },
  {
    city: "Udaipur",
    budget: "Splurge",
    time: "8 hours",
    travelStyle: "Food",
    title: "Royal Taste Day",
    summary: "A leisurely food plan with lake views and heritage dining.",
    stops: [
      { name: "Palace cafe brunch", time: "10:30 AM", cost: "High" },
      { name: "Cooking demo", time: "1:00 PM", cost: "High" },
      { name: "Lakefront dinner", time: "6:00 PM", cost: "High" },
    ],
  },
  {
    city: "Hyderabad",
    budget: "Budget",
    time: "6 hours",
    travelStyle: "Food",
    title: "Biryani and Bazaar",
    summary: "A classic low-cost plan around old-city food and market energy.",
    stops: [
      { name: "Charminar view", time: "10:00 AM", cost: "Free" },
      { name: "Laad Bazaar walk", time: "11:00 AM", cost: "Low" },
      { name: "Biryani lunch", time: "1:00 PM", cost: "Low" },
    ],
  },
  {
    city: "Hyderabad",
    budget: "Mid-range",
    time: "8 hours",
    travelStyle: "Culture",
    title: "Fort to Old City",
    summary: "A satisfying day across fort history, old lanes, and famous food.",
    stops: [
      { name: "Golconda Fort", time: "9:00 AM", cost: "Medium" },
      { name: "Qutb Shahi Tombs", time: "12:30 PM", cost: "Medium" },
      { name: "Old city dinner", time: "5:30 PM", cost: "Medium" },
    ],
  },
  {
    city: "Hyderabad",
    budget: "Splurge",
    time: "4 hours",
    travelStyle: "Relaxed",
    title: "Palace-Style Evening",
    summary: "A refined short plan with a premium meal and a gentle city view.",
    stops: [
      { name: "Heritage hotel tea", time: "3:00 PM", cost: "High" },
      { name: "Tank Bund sunset", time: "5:00 PM", cost: "Free" },
      { name: "Fine dining dinner", time: "6:30 PM", cost: "High" },
    ],
  },
];

const cities = Array.from(new Set(tripPlans.map((plan) => plan.city)));
const budgetOptions: BudgetLevel[] = ["Budget", "Mid-range", "Splurge"];
const timeOptions: AvailableTime[] = ["4 hours", "6 hours", "8 hours"];
const styleOptions: TravelStyle[] = ["Culture", "Food", "Nature", "Relaxed"];

function buildRecommendation(filters: {
  city: string;
  budget: BudgetLevel;
  time: AvailableTime;
  travelStyle: TravelStyle;
}): Recommendation | null {
  const exactMatch = tripPlans.find(
    (plan) =>
      plan.city === filters.city &&
      plan.budget === filters.budget &&
      plan.time === filters.time &&
      plan.travelStyle === filters.travelStyle,
  );

  if (exactMatch) {
    return {
      plan: exactMatch,
      label: "Exact match",
      reason: "Selected because it matches your city, budget, time, and travel style.",
    };
  }

  const sameCityMatch = tripPlans.find((plan) => plan.city === filters.city);
  if (sameCityMatch) {
    return {
      plan: sameCityMatch,
      label: "City match",
      reason: "Selected because it is a nearby starter plan for this city.",
    };
  }

  const sameStyleMatch = tripPlans.find((plan) => plan.travelStyle === filters.travelStyle);
  if (sameStyleMatch) {
    return {
      plan: sameStyleMatch,
      label: "Style match",
      reason: "Selected because it matches your travel style from the starter data.",
    };
  }

  const starterPlan = tripPlans[0];
  if (starterPlan) {
    return {
      plan: starterPlan,
      label: "Starter sample",
      reason: "Selected as a starter sample plan while more trip data is added.",
    };
  }

  return null;
}

function getNextRecommendation(currentPlan: TripPlan): Recommendation | null {
  const sameCityPlans = tripPlans.filter((plan) => plan.city === currentPlan.city);
  const sameStylePlans = tripPlans.filter(
    (plan) => plan.travelStyle === currentPlan.travelStyle && plan.city !== currentPlan.city,
  );
  const remainingPlans = tripPlans.filter(
    (plan) => plan.city !== currentPlan.city && plan.travelStyle !== currentPlan.travelStyle,
  );
  const pool = [...sameCityPlans, ...sameStylePlans, ...remainingPlans];

  if (pool.length === 0) {
    return null;
  }

  const currentIndex = pool.findIndex(
    (plan) =>
      plan.city === currentPlan.city &&
      plan.budget === currentPlan.budget &&
      plan.time === currentPlan.time &&
      plan.travelStyle === currentPlan.travelStyle &&
      plan.title === currentPlan.title,
  );

  const nextPlan = currentIndex >= 0 ? pool[(currentIndex + 1) % pool.length] : pool[0];

  return {
    plan: nextPlan,
    label:
      nextPlan.city === currentPlan.city
        ? "City match"
        : nextPlan.travelStyle === currentPlan.travelStyle
          ? "Style match"
          : "Starter sample",
    reason:
      nextPlan.city === currentPlan.city
        ? "Switched to another seeded plan from the same city so you can compare options."
        : nextPlan.travelStyle === currentPlan.travelStyle
          ? "Switched to another seeded plan with the same travel style."
          : "Switched to a starter sample plan so you can keep exploring.",
  };
}

function App() {
  const [city, setCity] = useState(cities[0]);
  const [budget, setBudget] = useState<BudgetLevel>("Budget");
  const [time, setTime] = useState<AvailableTime>("6 hours");
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Culture");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(buildRecommendation({ city, budget, time, travelStyle }));
    setHasSubmitted(true);
  }

  function handleTryAnotherPlan() {
    if (!result) {
      return;
    }

    const nextRecommendation = getNextRecommendation(result.plan);
    if (nextRecommendation) {
      setResult(nextRecommendation);
    }
  }

  return (
    <main className="page-shell">
      <section className="app-frame" aria-label="Trip Day Planner">
        <header className="app-header">
          <div>
            <p className="eyebrow">Day trip builder</p>
            <h1>Trip Day Planner</h1>
          </div>
          <div className="header-badge">v1</div>
        </header>

        <section className="hero-panel">
          <p>Choose your trip details and get a starter day plan from seeded local ideas.</p>
        </section>

        <form className="planner-form" onSubmit={handleSubmit}>
          <label>
            <span>City</span>
            <select value={city} onChange={(event) => setCity(event.target.value)}>
              {cities.map((cityOption) => (
                <option key={cityOption} value={cityOption}>
                  {cityOption}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Budget</span>
            <select
              value={budget}
              onChange={(event) => setBudget(event.target.value as BudgetLevel)}
            >
              {budgetOptions.map((budgetOption) => (
                <option key={budgetOption} value={budgetOption}>
                  {budgetOption}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Available time</span>
            <select
              value={time}
              onChange={(event) => setTime(event.target.value as AvailableTime)}
            >
              {timeOptions.map((timeOption) => (
                <option key={timeOption} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Travel style</span>
            <select
              value={travelStyle}
              onChange={(event) => setTravelStyle(event.target.value as TravelStyle)}
            >
              {styleOptions.map((styleOption) => (
                <option key={styleOption} value={styleOption}>
                  {styleOption}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Build my day</button>
        </form>

        <section className="result-panel" aria-live="polite">
          {!hasSubmitted ? (
            <div className="starter-state">
              <p className="eyebrow">Ready when you are</p>
              <h2>Build your first day plan</h2>
              <p>Fill out the form above and tap the button to see a recommended plan.</p>
            </div>
          ) : result ? (
            <>
              <div className="result-heading">
                <div>
                  <p className="eyebrow">Suggested plan</p>
                  <h2>{result.plan.title}</h2>
                </div>
                <span>{result.label}</span>
              </div>

              <p className="summary">{result.reason}</p>

              <div className="plan-tags">
                <span>{result.plan.city}</span>
                <span>{result.plan.budget}</span>
                <span>{result.plan.travelStyle}</span>
                <span>{result.plan.time}</span>
              </div>

              <p className="summary">{result.plan.summary}</p>

              <ol className="stop-list">
                {result.plan.stops.map((stop) => (
                  <li key={`${result.plan.title}-${stop.name}`}>
                    <div>
                      <strong>{stop.name}</strong>
                      <span>{stop.cost}</span>
                    </div>
                    <time>{stop.time}</time>
                  </li>
                ))}
              </ol>

              <div className="result-actions">
                <button type="button" className="secondary-button" onClick={handleTryAnotherPlan}>
                  Try another plan
                </button>
              </div>
            </>
          ) : (
            <div className="starter-state">
              <p className="eyebrow">No starter data</p>
              <h2>No plan available</h2>
              <p>Seeded trip data is empty, so there is nothing to recommend yet.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
