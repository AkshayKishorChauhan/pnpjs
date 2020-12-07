import { addProp } from "@pnp/odata";
import { _Group } from "../groups/types";
import { ISites, Sites } from "./types";

declare module "../groups/types" {
    interface _Group {
        readonly sites: ISites;
    }
    interface IGroup {
        readonly sites: ISites;
    }
}

addProp(_Group, "sites", Sites);
