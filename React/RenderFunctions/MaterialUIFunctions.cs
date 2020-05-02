using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.RenderFunctions
{

    /// <summary>
    /// Render functions for Material-UI components. https://github.com/mui-org/material-ui
    /// Requires `@material-ui/core/styles/ServerStyleSheets` to be exposed globally as `MaterialUI`
    /// </summary>
    public class MaterialUIFunctions : RenderFunctionsBase
    {
        /// <summary>
        /// HTML style tag containing the rendered styles
        /// </summary>
        public string RenderedStyles { get; private set; }

        /// <summary>
        /// Implementation of PreRender
        /// </summary>
        /// <param name="executeJs"></param>
        public override void PreRender(Func<string, string> executeJs)
        {
            executeJs("var serverStyleSheets = new MaterialUI.ServerStyleSheets();");
        }

        /// <summary>
        /// Implementation of WrapComponent
        /// </summary>
        /// <param name="componentToRender"></param>
        /// <returns></returns>
        public override string WrapComponent(string componentToRender)
        {
            return ($"serverStyleSheets.collect({componentToRender})");
        }

        /// <summary>
        /// Implementation of PostRender
        /// </summary>
        /// <param name="executeJs"></param>
        public override void PostRender(Func<string, string> executeJs)
        {
            RenderedStyles = $"<style id=\"material-ui-server-side\">{executeJs("serverStyleSheets.toString()")}</style>";
        }
    }
}
