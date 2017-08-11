			var GlobalText;
			function GetTextFromFile( textFile )
				{
					var request = new XMLHttpRequest();
					request.open( "GET", textFile, false );
					request.send(null);
					var Text = request.responseText;
					GlobalText = Text;
					return Text;
				}
			function SplitLines( textFile )
				{
					var Lines = textFile.split("}");
					return ( Lines );
				}
			function FindRoot( Chunks )
				{
					var i = 0;
					while( 1 )
						{
							if(Chunks[i].trim().startsWith( "ROOT" ) )
								{
									return GetChildren(Chunks[i]);
								}
							else
								{
									i++;
								}
						}
				}
			function FindNode( Chunks, Chunk )
				{
					var i = 0;
					while( 1 )
						{
							if(Chunks[i].trim().startsWith( "NODE" + " [" + Chunk.trim() + "]" ) )
								{
									return GetChildren(Chunks[i]);
								}
							else
								{
									i++;
								}
						}
				}
			function GetChildren( Chunks )
				{
					var children = Chunks.split("CHILD");
					return children.map(Filter);
				}
			function Filter( Chunks )
				{
					return Chunks.substring( Chunks.indexOf( "(" ) + 1, Chunks.lastIndexOf( ")" ) );
				}
			function Choise( Chunks )
				{
					document.body.innerHTML = '';
					document.write( Chunks[ 0 ] );
					for( var i = 1, link; i < Chunks.length; i++ )
						{
				    	link = document.createElement("BUTTON");
							document.write( "<br>" );
		 	  			link.innerHTML = Chunks[i];
							with( { n: i } )
								{
									link.onclick = function()
										{
											Pick( Chunks[n] );
										}
								}
							document.write( "<br>" );
							document.body.appendChild(link);
						}
				}
			function Pick( n )
				{
					Choise(FindNode(SplitLines( GlobalText ), n));
				}
			function CSL( FileLocation )
				{
					Choise(FindRoot(SplitLines(GetTextFromFile( FileLocation ))));
				}
