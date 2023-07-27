import * as React from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean
}

const AlertDialog = React.forwardRef<HTMLDivElement, Props>(
    ({ visible, ...props }, ref) => {

        const [canBeVisible, setCanBeVisible] = React.useState<boolean>(true);

        React.useEffect(() => {
            setCanBeVisible(visible);
        }, [visible]);

        return (
            <div 
            ref={ref} 
            {...props} 
            className={`border rounded-md bg-primary-foreground w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${ canBeVisible ? "visible" : "hidden"}`}>
                <div className="absolute w-full h-4">
                    <section className="flex justify-start space-x-1 mt-2 ml-2"> {
                    ["yellow", "green", "pink"].map((color) => (
                            <span key={color} className={`w-4 h-4 rounded-full bg-${color}-400 hover:opacity-50 cursor-pointer`} onClick={() => { setCanBeVisible(false)}}></span>
                        ))
                    }
                    </section>
                </div>
            </div>
        )
    }
);

AlertDialog.displayName = "AlertDialog";

export { AlertDialog };
