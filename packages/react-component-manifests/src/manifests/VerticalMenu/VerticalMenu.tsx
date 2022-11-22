import React, { forwardRef, useCallback } from "react";
import reactSchemaId from "@atrilabs/react-component-manifest-schema?id";
import type {
  AcceptsChildFunction,
  ReactComponentManifestSchema,
} from "@atrilabs/react-component-manifest-schema/lib/types";
import { flexColSort } from "@atrilabs/react-component-manifest-schema/lib/utils";
import iconSchemaId from "@atrilabs/component-icon-manifest-schema?id";
import { CommonIcon } from "../CommonIcon";
import CSSTreeId from "@atrilabs/app-design-forest/lib/cssTree?id";
import CustomTreeId from "@atrilabs/app-design-forest/lib/customPropsTree?id";
import { CSSTreeOptions } from "@atrilabs/app-design-forest/lib/cssTree";
import { CustomPropsTreeOptions } from "@atrilabs/app-design-forest/lib/customPropsTree";

export const VerticalMenu = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    custom: {
      title: string;
      menuItems: {
        name: string;
        onClick: () => {};
        subMenuItems?: {
          subMenuItemsName: string;
          onClick: () => {};
          subMenu?: {
            itemsName: string;
            onClick: () => {};
          }[];
        }[];
      }[];
    };
    className?: string;
  }
>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ ...props.styles, position: "relative" }}
      className={props.className}
    >
      VerticalMenu
    </div>
  );
});

const acceptsChild: AcceptsChildFunction = (info: any) => {
  if (info.childCoordinates.length === 0) {
    return 0;
  }
  return flexColSort(info.loc, info.childCoordinates) || 0;
};

const cssTreeOptions: CSSTreeOptions = {
  flexContainerOptions: true,
  flexChildOptions: true,
  positionOptions: true,
  typographyOptions: true,
  spacingOptions: true,
  sizeOptions: true,
  borderOptions: true,
  outlineOptions: true,
  backgroundOptions: true,
  miscellaneousOptions: true,
};

const customTreeOptions: CustomPropsTreeOptions = {
  dataTypes: {
    open: { type: "boolean" },
    src: { type: "static_asset" },
    iconHeight: { type: "number" },
    iconWidth: { type: "number" },
    strokeColor: { type: "color" },
    gap: { type: "number" },
    alignRight: { type: "boolean" },
  },
};

const compManifest: ReactComponentManifestSchema = {
  meta: { key: "VerticalMenu", category: "Basics" },
  render: {
    comp: VerticalMenu,
  },
  dev: {
    decorators: [],
    attachProps: {
      styles: {
        treeId: CSSTreeId,
        initialValue: { display: "inline-block" },
        treeOptions: cssTreeOptions,
        canvasOptions: { groupByBreakpoint: true },
      },
      custom: {
        treeId: CustomTreeId,
        initialValue: {
          open: true,
          iconHeight: 24,
          iconWidth: 24,
        },
        treeOptions: customTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
    },
    attachCallbacks: {
      onClick: [{ type: "controlled", selector: ["custom", "open"] }],
    },
    defaultCallbackHandlers: {},
    acceptsChild,
  },
};

const iconManifest = {
  panel: { comp: CommonIcon, props: { name: "VerticalMenu", svg: CommonIcon } },
  drag: {
    comp: CommonIcon,
    props: {
      name: "VerticalMenu",
      containerStyle: { padding: "1rem" },
      svg: CommonIcon,
    },
  },
  renderSchema: compManifest,
};

export default {
  manifests: {
    [reactSchemaId]: [compManifest],
    [iconSchemaId]: [iconManifest],
  },
};
