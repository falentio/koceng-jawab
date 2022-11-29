import { HandlerContext } from "$fresh/server.ts";
import { serve } from "https://deno.land/std/http/server.ts"

export const subjects = {
  pai: 1,
  pkn: 2,
  indo: 3,
  mat_w: 4,
  sejarah: 5,
  inggris: 6,
  senbud: 7,
  pjok: 8,
  pkwu: 9,
  jawa: 10,
  fisika: 11,
  kimia: 12,
  bio: 13,
  mat_p: 14,
  geo: 15,
}

const defaultUserAgent = () => `Mozilla/5.${Math.random() * 3 | 0} (X11; Linux x86_64) AppleWebKit/${537 + Math.random() * 10 | 0}.36 (KHTML, like Gecko) Chrome/${91 - Math.random() * 4 | 0}.${Math.random() * 4 | 0}.${4472 - Math.random() * 100 | 0}.${124 + Math.random() * 40 | 0} Safari/${537 - Math.random() * 20 | 0}.${36 + Math.random() * 30}`
const endpoint = () => `https://script.google.com/macros/s/AKfycby1LQUD6BfG4lDkTgZgbnkCJXgyBHe8-h3JwCQvLoIb3YHeRv7MuIBmOpeIxi4z4muHNw/callback?nocache_id=${Math.random() * 5000 | 0}`

async function getQuestions(subject: keyof typeof subjects, student: number, userAgent = defaultUserAgent()) {
  const body = new URLSearchParams()
  body.set("request", JSON.stringify(["ambilMapel",`[${student},${subjects[subject]}]`,null,[0],null,null,true,0]))
  const req = new Request(endpoint(), {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "x-same-domain": "1",
      "user-agent": userAgent.replaceAll(")", ()=> Math.random().toString(36)),
      //"cookie": `1P_JAR=${new Date().toISOString().slice(0, 10)}-1; AEC=AakniGP_${Math.random().toString(36).slice(3)}A4tDEiztUvpxei-pOjAW0QgSvOXG_RAXAuceRXnqw; NID=511=rrly3ll_${Math.random().toString(36).slice(3)}NRE20L4aoR6Q7LbceTvB7c6EaHYiq1czHDadO5pdKTtLwd4_${Math.random().toString(36).slice(3)}MT9a8wgsdfoDBz9T3QoUOJqG_o2bF_e7bB9_unozu3jT-${Math.random().toString(36).slice(3)}${Math.random().toString(36).slice(3)}`,
    },
    "referrer": "https://script.google.com/macros/s/AKfycby1LQUD6BfG4lDkTgZgbnkCJXgyBHe8-h3JwCQvLoIb3YHeRv7MuIBmOpeIxi4z4muHNw/exec",
    "referrerPolicy": "strict-origin-when-cross-origin",
    body,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  });
  const res = await fetch(req)

  if (!res.ok) {
    console.error(await res.text())
    console.error(req)
    console.error(body)
    throw new Error("failed to fetch")
  }

  const text = await res.text()
  let [[opExec, [zero, data]]] = JSON.parse(text.slice(6))
  const [questions, answers] = data.split("#")

  return {
    answers: answers.slice(0, -1).split("|"),
  }
}

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  const url = new URL(req.url)
  const result = await getQuestions(
    url.searchParams.get("subject"),
    +url.searchParams.get("student"),
    req.headers.get("user-agent") || defaultUserAgent(),
  )
  return new Response(JSON.stringify(result), {
    headers: {
      "content-type": "application/json",
    }
  });
};
