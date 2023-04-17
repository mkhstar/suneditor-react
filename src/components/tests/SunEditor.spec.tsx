import React from "react";
import suneditor from "suneditor";
import { fireEvent, render } from "@testing-library/react";
import SunEditor from "../SunEditor";
import { events } from "../../data/events";

jest.mock("suneditor", () => ({
  __esModule: true,
  default: {
    create: (t: HTMLTextAreaElement) => {
      const txtArea = t;

      txtArea.dataset.testid = "suneditor";

      const editor: {
        destroy: () => void;
        enable: () => void;
        onChange?: (value: string) => void;
        onBlur?: (e: Event, value: string) => void;
        core?: Record<string, any>;
        util: Record<string, any>;
        toolbar: Record<string, any>;
        appendContents: () => void;
        setContents: () => void;
        setOptions: () => void;
        getContents: () => void;
        disable: () => void;
        hide: () => void;
        show: () => void;
        readOnly: () => void;
        setDefaultStyle: () => void;
      } = {
        destroy: () => {},
        enable: () => {},
        util: {
          isIE: false,
        },
        toolbar: {
          hide: () => {},
          disable: () => {},
          show: () => {},
          enable: () => {},
        },
        getContents: () => "Contents",
        readOnly: () => {},
        setDefaultStyle: () => {},
        appendContents: () => {},
        setContents: () => {},
        setOptions: () => {},
        disable: () => {},
        hide: () => {},
        show: () => {},
        core: {
          focusEdge: () => {},
          context: {
            element: { wysiwyg: { blur: () => {}, focus: () => {} } },
          },
        },
      };

      txtArea.onchange = (e: any) => {
        const { value } = e.currentTarget;
        e.currentTarget.value = "";
        if (editor.onChange) editor.onChange(value);
      };
      txtArea.onblur = (e: any) => {
        if (editor.onBlur) editor.onBlur(e, "");
      };

      return editor;
    },
  },
}));

jest.mock("suneditor/src/plugins", () => ({
  default: [],
}));

describe("<SunEditor />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("Initialization", () => {
    it("should create suneditor", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      render(<SunEditor placeholder="Type here" />);

      expect(createSpy).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement), {
        plugins: expect.anything(),
        placeholder: "Type here",
        width: "100%",
      });

      expect(createSpy.mock.results[0].value).toEqual({
        destroy: expect.any(Function),
        onload: expect.any(Function),
        onChange: expect.any(Function),
        appendContents: expect.any(Function),
        setContents: expect.any(Function),
        getContents: expect.any(Function),
        setOptions: expect.any(Function),
        setDefaultStyle: expect.any(Function),
        readOnly: expect.any(Function),
        enable: expect.any(Function),
        core: expect.any(Object),
        util: expect.any(Object),
        disable: expect.any(Function),
        hide: expect.any(Function),
        show: expect.any(Function),
        toolbar: expect.any(Object),
      });
    });

    it("initial onload with no props", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      render(<SunEditor />);

      const setContentsSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "setContents"
      );
      const focusEdgeSpy = jest.spyOn(
        createSpy.mock.results[0].value.core,
        "focusEdge"
      );
      const appendContentsSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "appendContents"
      );
      const disableSpy = jest.spyOn(createSpy.mock.results[0].value, "disable");
      const readOnlySpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "readOnly"
      );
      const hideSpy = jest.spyOn(createSpy.mock.results[0].value, "hide");
      const toolbarHideSpy = jest.spyOn(
        createSpy.mock.results[0].value.toolbar,
        "hide"
      );
      const toolbarDisableSpy = jest.spyOn(
        createSpy.mock.results[0].value.toolbar,
        "disable"
      );

      createSpy.mock.results[0].value.onload(false);

      expect(setContentsSpy).not.toHaveBeenCalled();
      expect(focusEdgeSpy).not.toHaveBeenCalled();
      expect(appendContentsSpy).not.toHaveBeenCalled();
      expect(disableSpy).not.toHaveBeenCalled();
      expect(readOnlySpy).not.toHaveBeenCalled();
      expect(hideSpy).not.toHaveBeenCalled();
      expect(toolbarHideSpy).not.toHaveBeenCalled();
      expect(toolbarDisableSpy).not.toHaveBeenCalled();
    });

    it("initial onload with props", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      render(
        <SunEditor
          disable
          setContents="value"
          appendContents="contents"
          readOnly
          hide
          hideToolbar
          disableToolbar
        />
      );

      const setContentsSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "setContents"
      );
      const focusEdgeSpy = jest.spyOn(
        createSpy.mock.results[0].value.core,
        "focusEdge"
      );
      const appendContentsSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "appendContents"
      );
      const disableSpy = jest.spyOn(createSpy.mock.results[0].value, "disable");
      const readOnlySpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "readOnly"
      );
      const hideSpy = jest.spyOn(createSpy.mock.results[0].value, "hide");
      const toolbarHideSpy = jest.spyOn(
        createSpy.mock.results[0].value.toolbar,
        "hide"
      );
      const toolbarDisableSpy = jest.spyOn(
        createSpy.mock.results[0].value.toolbar,
        "disable"
      );

      createSpy.mock.results[0].value.onload(false);

      expect(setContentsSpy).toHaveBeenCalledTimes(1);
      expect(focusEdgeSpy).toHaveBeenCalledTimes(1);
      expect(appendContentsSpy).toHaveBeenCalledTimes(1);
      expect(disableSpy).toHaveBeenCalledTimes(1);
      expect(readOnlySpy).toHaveBeenCalledTimes(1);
      expect(hideSpy).toHaveBeenCalledTimes(1);
      expect(toolbarHideSpy).toHaveBeenCalledTimes(1);
      expect(toolbarDisableSpy).toHaveBeenCalledTimes(1);
    });

    it("should call destroy on unmount", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      const result = render(<SunEditor />);

      const destroySpy = jest.spyOn(createSpy.mock.results[0].value, "destroy");

      expect(destroySpy).not.toHaveBeenCalled();

      result.unmount();

      expect(destroySpy).toHaveBeenCalledTimes(1);
    });

    it("should should set lang from suneditor when string is used", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      render(<SunEditor lang="en" />);

      expect(createSpy).toHaveBeenCalledWith(
        expect.any(HTMLTextAreaElement),
        expect.objectContaining({
          lang: expect.objectContaining({ code: "en" }),
        })
      );
    });

    it("should focus on editor when autoFocus prop is set to true", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      render(<SunEditor autoFocus />);
      const focusSpy = jest.spyOn(
        createSpy.mock.results[0].value.core.context.element.wysiwyg,
        "focus"
      );

      createSpy.mock.results[0].value.onload(false);

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it("should blur when autoFocus prop is set to false", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      render(<SunEditor autoFocus={false} />);
      const blurSpy = jest.spyOn(
        createSpy.mock.results[0].value.core.context.element.wysiwyg,
        "blur"
      );

      createSpy.mock.results[0].value.onload(false);

      expect(blurSpy).toHaveBeenCalledTimes(1);
    });

    it("should call onChange prop when changes occurs", async () => {
      const onChange = jest.fn();

      const result = render(<SunEditor onChange={onChange} />);
      const editor = (await result.findByTestId(
        "suneditor"
      )) as HTMLTextAreaElement;

      fireEvent.change(editor, { target: { value: "Changed text" } });

      expect(onChange).toHaveBeenCalledWith("Changed text");
      expect(editor.value).toEqual("");
    });

    it("should call onBlur prop with contents when editor is blurred", async () => {
      const onBlur = jest.fn();

      const result = render(
        <SunEditor onBlur={onBlur} defaultValue="Contents" />
      );
      const editor = (await result.findByTestId(
        "suneditor"
      )) as HTMLTextAreaElement;

      fireEvent.focus(editor);

      fireEvent.blur(editor);

      expect(onBlur).toHaveBeenCalledWith(expect.any(Object), "Contents");
    });

    it("should set value when name is specified", async () => {
      const result = render(<SunEditor name="editor" />);
      const editor = (await result.findByTestId(
        "suneditor"
      )) as HTMLTextAreaElement;

      fireEvent.change(editor, { target: { value: "Changed text" } });

      expect(editor.value).toEqual("Changed text");
    });

    it("should set expected events", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      render(
        <SunEditor
          {...events.reduce((acc, v) => ({ ...acc, [v]: jest.fn() }), {})}
        />
      );

      expect(createSpy.mock.results[0].value).toEqual({
        destroy: expect.any(Function),
        onload: expect.any(Function),
        onChange: expect.any(Function),
        appendContents: expect.any(Function),
        setContents: expect.any(Function),
        setOptions: expect.any(Function),
        setDefaultStyle: expect.any(Function),
        getContents: expect.any(Function),
        core: expect.any(Object),
        util: expect.any(Object),
        disable: expect.any(Function),
        hide: expect.any(Function),
        show: expect.any(Function),
        readOnly: expect.any(Function),
        enable: expect.any(Function),
        toolbar: expect.any(Object),
        onMouseDown: expect.any(Function),
        onScroll: expect.any(Function),
        onInput: expect.any(Function),
        onClick: expect.any(Function),
        onKeyUp: expect.any(Function),
        onKeyDown: expect.any(Function),
        onFocus: expect.any(Function),
        onImageUploadBefore: expect.any(Function),
        onVideoUploadBefore: expect.any(Function),
        onAudioUploadBefore: expect.any(Function),
        onImageUpload: expect.any(Function),
        onAudioUpload: expect.any(Function),
        onVideoUpload: expect.any(Function),
        onImageUploadError: expect.any(Function),
        onVideoUploadError: expect.any(Function),
        onAudioUploadError: expect.any(Function),
        onSave: expect.any(Function),
        onSetToolbarButtons: expect.any(Function),
        imageUploadHandler: expect.any(Function),
        toggleCodeView: expect.any(Function),
        toggleFullScreen: expect.any(Function),
        showInline: expect.any(Function),
        showController: expect.any(Function),
      });
    });
  });

  describe("Prop changes", () => {
    it("should toggle editor properties negative", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      const { rerender } = render(<SunEditor />);

      const disableSpy = jest.spyOn(createSpy.mock.results[0].value, "disable");
      const readOnlySpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "readOnly"
      );
      const hideSpy = jest.spyOn(createSpy.mock.results[0].value, "hide");
      const toolbarHideSpy = jest.spyOn(
        createSpy.mock.results[0].value.toolbar,
        "hide"
      );
      const toolbarDisableSpy = jest.spyOn(
        createSpy.mock.results[0].value.toolbar,
        "disable"
      );

      expect(disableSpy).not.toHaveBeenCalled();
      expect(readOnlySpy).not.toHaveBeenCalled();
      expect(hideSpy).not.toHaveBeenCalled();
      expect(toolbarHideSpy).not.toHaveBeenCalled();
      expect(toolbarDisableSpy).not.toHaveBeenCalled();

      rerender(<SunEditor disable hide hideToolbar disableToolbar readOnly />);

      expect(disableSpy).toHaveBeenCalledTimes(1);
      expect(readOnlySpy).toHaveBeenCalledTimes(1);
      expect(hideSpy).toHaveBeenCalledTimes(1);
      expect(toolbarHideSpy).toHaveBeenCalledTimes(1);
      expect(toolbarDisableSpy).toHaveBeenCalledTimes(1);
    });

    it("should toggle editor properties positive", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      const { rerender } = render(
        <SunEditor disable hide hideToolbar disableToolbar />
      );

      const enableSpy = jest.spyOn(createSpy.mock.results[0].value, "enable");
      const showSpy = jest.spyOn(createSpy.mock.results[0].value, "show");
      const toolbarHideSpy = jest.spyOn(
        createSpy.mock.results[0].value.toolbar,
        "show"
      );
      const toolbarEnableSpy = jest.spyOn(
        createSpy.mock.results[0].value.toolbar,
        "enable"
      );

      expect(enableSpy).not.toHaveBeenCalled();
      expect(showSpy).not.toHaveBeenCalled();
      expect(toolbarHideSpy).not.toHaveBeenCalled();
      expect(toolbarEnableSpy).not.toHaveBeenCalled();

      rerender(<SunEditor />);

      expect(enableSpy).toHaveBeenCalledTimes(1);
      expect(showSpy).toHaveBeenCalledTimes(1);
      expect(toolbarHideSpy).toHaveBeenCalledTimes(1);
      expect(toolbarEnableSpy).toHaveBeenCalledTimes(1);
    });

    it("should toggle placeholder, width and height", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      const { rerender } = render(<SunEditor />);
      const setOptionsSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "setOptions"
      );

      expect(setOptionsSpy).not.toHaveBeenCalled();

      rerender(
        <SunEditor placeholder="Placeholder" width="400px" height="500px" />
      );

      expect(setOptionsSpy).toHaveBeenCalledTimes(1);
      expect(setOptionsSpy).toHaveBeenCalledWith({
        placeholder: "Placeholder",
        width: "400px",
        height: "500px",
      });
    });

    it("should toggle lang", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      const { rerender } = render(<SunEditor lang="en" />);
      const setOptionsSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "setOptions"
      );

      expect(setOptionsSpy).not.toHaveBeenCalled();

      rerender(<SunEditor lang="fr" />);

      expect(setOptionsSpy).toHaveBeenCalledTimes(1);
      expect(setOptionsSpy).toHaveBeenCalledWith({
        lang: expect.objectContaining({ code: "fr" }),
      });
    });

    it("should toggle setContents", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      const { rerender } = render(<SunEditor />);
      const setContentsSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "setContents"
      );

      expect(setContentsSpy).not.toHaveBeenCalled();

      rerender(<SunEditor setContents="contents" />);

      expect(setContentsSpy).toHaveBeenCalledTimes(1);
      expect(setContentsSpy).toHaveBeenCalledWith("contents");
    });

    it("should toggle appendContents", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      const { rerender } = render(<SunEditor />);
      const appendContentsSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "appendContents"
      );

      expect(appendContentsSpy).not.toHaveBeenCalled();

      rerender(<SunEditor appendContents="contents" />);

      expect(appendContentsSpy).toHaveBeenCalledTimes(1);
      expect(appendContentsSpy).toHaveBeenCalledWith("contents");
    });

    it("should toggle setDefaultStyle", () => {
      const createSpy = jest.spyOn(suneditor, "create");

      const { rerender } = render(<SunEditor />);
      const setDefaultStyleSpy = jest.spyOn(
        createSpy.mock.results[0].value,
        "setDefaultStyle"
      );

      expect(setDefaultStyleSpy).not.toHaveBeenCalled();

      rerender(<SunEditor setDefaultStyle="color: red;" />);

      expect(setDefaultStyleSpy).toHaveBeenCalledTimes(1);
      expect(setDefaultStyleSpy).toHaveBeenCalledWith("color: red;");
    });
  });
});
