# @pnp/sp/taxonomy

Provides access to the v2.1 api term store

### Docs updated with v2.0.9 release as the underlying API changed.

> NOTE: This API may change so please be aware updates to the taxonomy module will not trigger a major version bump in PnPjs even if they are breaking. Once things stabalize this note will be removed.

[![Invokable Banner](https://img.shields.io/badge/Invokable-informational.svg)](../concepts/invokable.md) [![Selective Imports Banner](https://img.shields.io/badge/Selective%20Imports-informational.svg)](../concepts/selective-imports.md)

## Term Store

Access term store data from the root sp object as shown below.

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermStoreInfo } from "@pnp/sp/taxonomy";

// get term store data
const info: ITermStoreInfo = await sp.termStore();
```

## Term Groups

Access term group information

### List

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermGroupInfo } from "@pnp/sp/taxonomy";

// get term groups
const info: ITermGroupInfo[] = await sp.termStore.groups();
```

### Get By Id

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermGroupInfo } from "@pnp/sp/taxonomy";

// get term groups data
const info: ITermGroupInfo = await sp.termStore.groups.getById("338666a8-1111-2222-3333-f72471314e72")();
```

## Term Sets

Access term set information

### List

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermSetInfo } from "@pnp/sp/taxonomy";

// get get set info
const info: ITermSetInfo[] = await sp.termStore.groups.getById("338666a8-1111-2222-3333-f72471314e72").sets();
```

### Get By Id

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermSetInfo } from "@pnp/sp/taxonomy";

// get term set data
const info: ITermSetInfo = await sp.termStore.groups.getById("338666a8-1111-2222-3333-f72471314e72").sets.getById("338666a8-1111-2222-3333-f72471314e72")();
```

### getAllChildrenAsOrderedTree

_Added in 2.0.13_

This method will get all of a set's child terms in an ordered array. It is a costly method in terms of requests so we suggest you cache the results as taxonomy trees seldom change.

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermInfo } from "@pnp/sp/taxonomy";
import { dateAdd, PnPClientStorage } from "@pnp/common";

// here we get all the children of a given set
const childTree = await sp.termStore.groups.getById("338666a8-1111-2222-3333-f72471314e72").sets.getById("338666a8-1111-2222-3333-f72471314e72").getAllChildrenAsOrderedTree();




// here we show caching the results using the PnPClientStorage class, there are many caching libraries and options available
const store = new PnPClientStorage();

// our tree likely doesn't change much in 30 minutes for most applications
// adjust to be longer or shorter as needed
const cachedTree = await store.local.getOrPut("myKey", () => {
    return sp.termStore.groups.getById("338666a8-1111-2222-3333-f72471314e72").sets.getById("338666a8-1111-2222-3333-f72471314e72").getAllChildrenAsOrderedTree();
}, dateAdd(new Date(), "minute", 30));
```

## Terms

Access term set information

### List

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermInfo } from "@pnp/sp/taxonomy";

// list all the terms that are direct children of this set
const infos: ITermInfo[] = await sp.termStore.groups.getById("338666a8-1111-2222-3333-f72471314e72").sets.getById("338666a8-1111-2222-3333-f72471314e72").children();
```

### List (terms)

_Added in 2.0.13_

You can use the terms property to get a flat list of all terms in the set. These terms do not contain parent/child relationship information.

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermInfo } from "@pnp/sp/taxonomy";

// list all the terms that are direct children of this set
const infos: ITermInfo[] = await sp.termStore.groups.getById("338666a8-1111-2222-3333-f72471314e72").sets.getById("338666a8-1111-2222-3333-f72471314e72").terms();
```

### Get By Id

```TypeScript
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermInfo } from "@pnp/sp/taxonomy";

// get term set data
const info: ITermInfo = await sp.termStore.groups.getById("338666a8-1111-2222-3333-f72471314e72").sets.getById("338666a8-1111-2222-3333-f72471314e72").getTermById("338666a8-1111-2222-3333-f72471314e72")();
```
