import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { subjects } from "../routes/api/questions.ts"
interface CounterProps {
  start: number;
}

const classroom = {
  "xii mipa 1": 325,
  "xii mipa 2": 361,
}

export default function Counter(props: CounterProps) {
  const [answers, setAnswers] = useState<string[]>([])
  const [c, setC] = useState("xii mipa 1")
  const [student, setStudent] = useState(1)
  const [subject, setSubject] = useState("mat_w")
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    try {
      setAnswers([])
      setLoading(true)
      const url = `/api/questions?subject=${subject}&student=${classroom[c] + student}`
      const res = await fetch(url)
      const json = await res.json()
      if (url === `/api/questions?subject=${subject}&student=${classroom[c] + student}`) {
        setAnswers(json.answers)
      }
    } catch (e) {
      setErr(e)
    } finally {
      setLoading(false)
    }
  }, [student, subject])

  useEffect(() => {
    setStudent(1)
  }, [c])
  return (
    <>
      <div class="flex flex-col w-full">
      {err && (
        <div class="bg-red-300 text-xl">
          <span>  Error: </span>
          <div>{err.message}</div>
        </div>
      )}
      <div class="flex flex-col">
        <label class="flex flex-col">
          <span> matpel </span>
          <select class="h-10" onChange={(e) => setSubject(e.target.value)}>
            {Object.keys(subjects).sort().map(i => (
              <option value={i}>{i.replace("_", " ")}</option>
            ))}
          </select>
        </label>
        <label class="flex flex-col">
          <span> kelas </span>
          <select class="h-10" onChange={(e) => setC(e.target.value)}>
            {Object.keys(classroom).map(i => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </label>
        <label class="flex flex-col">
          <span> Absen </span>
          <input type="number" min="1" max="35" class="bg-gray-100 h-10" onChange={(e) => setStudent(+e.target.value)} value={student}/>
        </label>
      </div>
        {!loading && answers.map((a, i) => (
          <div class="flex flex-row gap-2">
            <span> {i + 1}. </span>
            <span> {a} </span>
          </div>
        ))}
      </div>
    </>
  );
}
