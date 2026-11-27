import React from 'react';

type PartProps={children?:React.ReactNode;role?:string;scope?:'col'|'row'|'colgroup'|'rowgroup';'data-mobile-label'?:string};
const part=(node:React.ReactNode,tag:string):node is React.ReactElement<PartProps>=>React.isValidElement<PartProps>(node)&&node.type===tag;
const text=(node:React.ReactNode):string=>React.Children.toArray(node).map(n=>typeof n==='string'||typeof n==='number'?String(n):React.isValidElement<PartProps>(n)?text(n.props.children):'').join('');
// All analytics tables have one flat header row, no merged cells. Derive labels from the actual headers,
// including dynamically selected subjects and reporting months. Keep native table elements and explicit roles.
export function ResponsiveTable({children,className,...props}:React.ComponentPropsWithoutRef<'table'>){
 const groups=React.Children.toArray(children);
 const header=groups.find(n=>part(n,'thead'));
 const headerRow=part(header,'thead')?React.Children.toArray(header.props.children).find(n=>part(n,'tr')):undefined;
 const labels=part(headerRow,'tr')?React.Children.toArray(headerRow.props.children).filter(n=>part(n,'th')).map(n=>text(n.props.children).trim()):[];
 return <table {...props} role="table" className={['responsive-analytics-table',className].filter(Boolean).join(' ')}>{React.Children.map(children,group=>{
  if(!part(group,'thead')&&!part(group,'tbody'))return group;
  const head=group.type==='thead';
  return React.cloneElement(group,{role:'rowgroup'},React.Children.map(group.props.children,row=>{
   if(!part(row,'tr'))return row;
   return React.cloneElement(row,{role:'row'},React.Children.map(row.props.children,(cell,i)=>{
    if(head&&part(cell,'th'))return React.cloneElement(cell,{role:'columnheader',scope:'col'});
    if(!head&&part(cell,'td'))return React.cloneElement(cell,{role:'cell','data-mobile-label':labels[i]||''},<><span className="analytics-field-label" aria-hidden="true">{labels[i]||''}</span><div className="analytics-field-value">{cell.props.children}</div></>);
    return cell;
   }));
  }));
 })}</table>;
}
