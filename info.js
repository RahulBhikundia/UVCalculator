import fs from "fs";

var level = (index) => {
  if (index >= 0 && index < 3) {
    return {
      level: "low",
      protection: "Minimal",
      recommendation:
        "It's generally safe to be outside without sunscreen or an umbrella for short periods. However, if you have very sensitive skin or are out for extended periods, using sunscreen with a lower SPF or wearing protective clothing is still advisable.",
    };
  } else if (index >= 3 && index < 6) {
    return {
      level: "mod",
      protection: "Moderate",
      recommendation:
        "Use sunscreen with at least SPF 30. Seek shade during midday hours (10 a.m. to 4 p.m.), wear protective clothing, and consider using an umbrella if you're going to be outside for long periods.",
    };
  } else if (index >= 6 && index < 8) {
    return {
      level: "high",
      protection: "High",
      recommendation:
        "Apply sunscreen with SPF 30 or higher every two hours, and reapply after swimming or sweating. Wear a hat, sunglasses, and protective clothing. An umbrella can provide additional protection, especially if you are in direct sunlight for extended periods.",
    };
  } else if (index >= 8 && index < 11) {
    return {
      level: "vhigh",
      protection: "Very High",
      recommendation:
        "Apply sunscreen with SPF 30 or higher liberally and frequently. Seek shade whenever possible, wear long-sleeved shirts, wide-brimmed hats, and sunglasses. Using an umbrella is highly recommended to minimize sun exposure.",
    };
  } else if (index >= 11) {
    return {
      level: "ext",
      protection: "Extreme",
      recommendation:
        "Avoid being outside during peak hours (10 a.m. to 4 p.m.). If you must be outside, apply sunscreen with SPF 30 or higher generously and frequently, wear protective clothing, a wide-brimmed hat, and sunglasses. Using an umbrella is essential to protect yourself from the intense UV radiation.",
    };
  }
};

var info = (data, req) => {
  const fileData = JSON.parse(fs.readFileSync("data/type.json", "utf8"));

  const response = {
    index: data.result.uv,
    level: level(data.result.uv).protection,
    ts: (200 * fileData[req.color - 1].factor) / (3 * data.result.uv),
    ta: fileData[req.color - 1].tan,
    vd: fileData[req.color - 1].level[level(data.result.uv).level],
    date: req.date,
    time: req.time,
    color: req.color,
    protect: level(data.result.uv).protection,
    recommed: level(data.result.uv).recommendation,
  };

  console.log("vd" + response.vd);
  return response;
};

export default info;
