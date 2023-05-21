export function saveByteArrayAsFile( byteArray: any, fileName: string ) {

    const blob = new Blob( [ byteArray ], { type: 'application/octet-stream' } );

    const uri = window.URL.createObjectURL( blob );

    const link = document.createElement( 'a' );

    link.href = uri;

    link.setAttribute( 'download', fileName );
    document.body.appendChild( link );

    link.click();
    link.remove();

    URL.revokeObjectURL( uri );
}