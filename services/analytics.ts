import UAParser from "ua-parser-js";
import IPinfoWrapper from "ipinfo";
import { getCountryData } from "countries-list";

const ipInfoClient = new IPinfoWrapper("3f197e26fa9210");
const kv = await Deno.openKv();

export const recordVisit = async (
  hostname: string,
  userAgent: string,
  pathname: string,
  referer: string,
) => {
  try {
    const ipRes: { countryCode: string } = await ipInfoClient.lookupIp(
      hostname,
    );
    const parser = new UAParser(userAgent);
    const now = new Date();
    const prefix = [
      "analytics",
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    ];
    const visitor = await kv.get(["visitor", hostname]);
    const keysToIncrement = [
      visitor.value ? [] : ["visitor", hostname],
      visitor.value ? [] : [...prefix, "visitors"],
      [...prefix, "views"],
      [...prefix, "pages", pathname],
      [...prefix, "referers", referer],
      [...prefix, "countries", ipRes.countryCode],
      [...prefix, "os", parser.getOS().name],
      [...prefix, "browsers", parser.getBrowser().name],
    ].filter((arr) => arr[arr.length - 1]);
    await kv
      .atomic()
      .mutate(
        ...keysToIncrement.map(
          (arr) => ({
            type: "sum",
            key: arr,
            value: new Deno.KvU64(1n),
          } as Deno.KvMutation),
        ),
      )
      .commit();
  } catch (err) {
    console.error("err could not record visit", err);
  }
};

export interface AnalyticsDataPoint {
  name: string;
  count: number;
}

export interface AnalyticsData {
  views: number;
  vistors: number;
  pages: AnalyticsDataPoint[];
  referrers: AnalyticsDataPoint[];
  os: AnalyticsDataPoint[];
  countries: AnalyticsDataPoint[];
  browsers: AnalyticsDataPoint[];
}

const addMetric = (arr: AnalyticsDataPoint[], name: string, count: number) => {
  const index = arr.findIndex((it) => it.name === name);
  if (index > -1) {
    arr[index].count += count;
  } else {
    arr.push({ name, count });
  }
};

export const getAnalyticsData = async () => {
  const entries = kv.list({ prefix: ["analytics"] });
  const data = {
    views: 0,
    vistors: 0,
    browsers: [],
    countries: [],
    os: [],
    referrers: [],
    pages: [],
  } as AnalyticsData;
  for await (const entry of entries) {
    if (entry.key[2] === "views") {
      data.views = entry.value as number;
    }
    if (entry.key[2] === "visitors") {
      data.vistors = entry.value as number;
    }
    if (entry.key[2] === "browsers") {
      addMetric(data.browsers, entry.key[3] as string, entry.value as number);
    }
    if (entry.key[2] === "os") {
      addMetric(data.os, entry.key[3] as string, entry.value as number);
    }
    if (entry.key[2] === "pages") {
      addMetric(data.pages, entry.key[3] as string, entry.value as number);
    }
    if (entry.key[2] === "referers") {
      addMetric(data.referrers, entry.key[3] as string, entry.value as number);
    }
    if (entry.key[2] === "countries") {
      const code = entry.key[3] as string;
      const name = getCountryData(code).name;
      addMetric(data.countries, name, entry.value as number);
    }
  }
  return data;
};
