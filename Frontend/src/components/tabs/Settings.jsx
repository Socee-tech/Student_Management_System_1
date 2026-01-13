import { ThemeToggle } from "../themeToggle";

export default function Settings() {
    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Settings</h2>
            </div>

            <div className="bg-t-bg/20 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-semibold">Theme</div>
                        <div className="text-sm text-primary/70">Light / Dark mode</div>
                    </div>
                    <ThemeToggle />
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-t-bg">
                                <th className="th-tr">Setting</th>
                                <th className="th-tr">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-t-odd hover:bg-t-hover">
                                <td className="tb-td">Role</td>
                                <td className="tb-td">Admin</td>
                            </tr>
                            <tr className="odd:bg-t-odd hover:bg-t-hover">
                                <td className="tb-td">Version</td>
                                <td className="tb-td">v1.0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
