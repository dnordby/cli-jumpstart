import { execSync } from "child_process";
const help = () => {
    execSync(`shopsync --help`);
};
export default help;
