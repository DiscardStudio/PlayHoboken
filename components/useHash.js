import { useState } from "react";

export default function useHash() {
    const [hash, setHash] = useState(0);
    const Hash = (pass) => {
        var hash = 0, i, chr;
        if (pass.length === 0) return hash;
        for (i = 0; i < pass.length; i++) {
            chr   = pass.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        setHash(hash);
    }

    return [hash, Hash];
}