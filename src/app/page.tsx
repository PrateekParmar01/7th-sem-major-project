import Link from "next/link"
import { MdArrowRightAlt } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex items-start justify-center mt-32">
      <div className="w-[24vw] border-2 border-white rounded-lg p-4 flex items-center justify-center gap-6 flex-col">
        <h1 className="text-3xl font-semibold">Welcome to Adaptix</h1>
        <p className="text-center text-lg text-gray-600">Adaptix is a AI-enabled learning platform that helps the students to prepare for the exams at one place with interactive course content and quizes</p>
        <Link href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=925053458751-p1oilt89bo9tvgdo5ckjdk413lf7tt43.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=2nvo4ObSUpYsEfIKoYgsmIPBYDLy4RgJFEZx29Qvx2I&code_challenge=5_v81UKlRH8Wq4fwSX3_ufZ1v_JnlzTdHUuL2VjNH5U&code_challenge_method=S256&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow"
        className="flex items-center gap-3 text-lg hover:cursor-pointer hover:bg-blue-400 px-10 py-2 bg-blue-600 rounded-lg border-2 black">Let's Go <MdArrowRightAlt/></Link>
      </div>
    </div>
  )
}
