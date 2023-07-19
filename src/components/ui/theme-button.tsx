import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";



export default function ThemeButton({ size }: { size?: number}) {

    const { setTheme, theme } = useTheme();

    return (
        <button  onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            { theme === "light" ?  <Moon size={size} /> : <Sun size={size}/> }
        </button>
    )
}